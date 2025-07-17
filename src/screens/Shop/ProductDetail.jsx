/**
 * @fileoverview ProductDetail screen component for displaying individual product information.
 * Shows detailed product view with add to cart functionality and quantity selection.
 * @author Stocchero
 * @version 1.0.0
 */

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useState } from "react";
import colors from "../../global/colors";
import ButtonCount from "../../components/ButtonCount";
import { safeAddItemToCart } from "../../features/cart/cartThunks";
import { useGetProductByIdQuery } from "../../services/shop/shopApi";
import Loading from "../../components/Loading";

/**
 * ProductDetail screen component props
 * @typedef {Object} ProductDetailProps
 * @property {Object} navigation - React Navigation object for screen navigation
 * @property {function} navigation.navigate - Function to navigate to other screens
 * @property {Object} route - React Navigation route object with parameters
 * @property {Object} route.params - Route parameters
 * @property {string} route.params.productId - Selected product ID
 */

/**
 * ProductDetail screen component for displaying individual product information.
 * Shows comprehensive product details including images, description, price, stock status,
 * and quantity selection with add to cart functionality.
 *
 * Features:
 * - RTK Query integration for individual product fetching
 * - Large product image display with optimized loading
 * - Detailed product information (title, price, description, stock)
 * - Quantity selection with stock validation
 * - Add to cart functionality with stock checking
 * - Loading states and error handling
 * - Navigation options after adding to cart
 * - Stock validation with user feedback alerts
 * - Redux integration for cart management
 *
 * @component
 * @param {ProductDetailProps} props - Component props
 * @returns {React.JSX.Element} Rendered product detail screen
 *
 * @example
 * ```javascript
 * // Used in ShopStack navigator
 * <Stack.Screen
 *   name="ProductDetail"
 *   component={ProductDetail}
 *   options={{ headerTitle: "" }}
 * />
 *
 * // Navigation from Products screen
 * navigation.navigate("ProductDetail", { productId: "123" });
 * ```
 */
const ProductDetail = ({ navigation }) => {
  // Get product ID from navigation route
  const route = useRoute();
  const dispatch = useDispatch();
  const { productId } = route.params;

  // Local quantity state
  const [quantity, setQuantity] = useState(1);

  // Fetch individual product data
  const { data: product, isLoading: isLoadingProduct } =
    useGetProductByIdQuery(productId);

  // Show loading state while fetching product
  if (isLoadingProduct) {
    return <Loading text={`Cargando producto ${productId}...`} />;
  }

  // Handle product not found
  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Producto no encontrado.</Text>
      </View>
    );
  }

  /**
   * Handles quantity changes from ButtonCount component
   * @param {number} newCount - New quantity value
   */
  const handleQuantityChange = (newCount) => {
    setQuantity(newCount);
  };

  /**
   * Validates if the selected quantity is valid against available stock
   * @param {number} q - Quantity to validate
   * @param {number} stock - Available stock
   * @returns {boolean} True if quantity is valid, false otherwise
   */
  const isQuantityValid = (q, stock) => {
    if (q <= 0) {
      Alert.alert("Cantidad inválida", "Debés agregar al menos 1 unidad.");
      return false;
    }

    if (q > stock) {
      Alert.alert("Stock insuficiente", "No hay suficiente stock disponible.");
      return false;
    }

    return true;
  };

  /**
   * Handles adding product to cart with quantity validation
   * Shows success/error alerts and navigation options
   */
  const handleAddToCart = async () => {
    if (!isQuantityValid(quantity, product.stock)) return;

    const itemToAdd = { ...product, quantity };
    const result = await dispatch(safeAddItemToCart(itemToAdd));
    if (!result) {
      Alert.alert("Error", "No se pudo agregar al carrito.");
      return;
    }

    Alert.alert("Éxito", "Producto agregado al carrito", [
      {
        text: "Ir al carrito",
        onPress: () => navigation.navigate("Carrito"),
      },
      {
        text: "Seguir comprando",
        style: "cancel",
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={product.mainImage}
        style={styles.image}
        contentFit="cover"
        transition={300}
        cachePolicy="memory-disk"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toLocaleString()}</Text>
        <Text style={styles.description}>{product.longDescription}</Text>
        <Text style={styles.stock}>Stock: {product.stock}</Text>
        <ButtonCount
          initial={1}
          stock={product.stock}
          onQuantityChange={handleQuantityChange}
        />
        <Pressable style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Agregar al carrito</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    width: "100%",
    height: 320,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: colors.white,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: colors.gray900,
  },
  price: {
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
    color: colors.success,
  },
  stock: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: colors.gray,
  },
  description: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: colors.gray,
    lineHeight: 22,
  },
  button: {
    marginTop: 24,
    backgroundColor: colors.black,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontFamily: "Inter-Bold",
    color: colors.white,
    fontSize: 16,
    textTransform: "uppercase",
  },
});
