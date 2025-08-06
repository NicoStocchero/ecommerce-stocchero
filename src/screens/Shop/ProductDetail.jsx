/**
 * @fileoverview ProductDetail screen component for displaying individual product information.
 * Uses the modern UI system with consistent design.
 * @author Stocchero
 * @version 1.0.0
 */

import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { Image } from "expo-image";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useState } from "react";
import colors from "../../global/colors";
import ButtonCount from "../../components/ButtonCount";
import { Card, Button } from "../../components/UI";
import { safeAddItemToCart } from "../../features/cart/cartThunks";
import { useGetProductByIdQuery } from "../../services/shop/shopApi";
import Loading from "../../components/Loading";
import { useSQLite } from "../../hooks/useSQLite";
import { withErrorHandling } from "../../utils/errorHandler";

/**
 * ProductDetail screen component
 * @param {Object} props - Component props
 * @param {Object} props.navigation - React Navigation object
 * @returns {React.JSX.Element} Rendered product detail screen
 */
const ProductDetail = ({ navigation }) => {
  // Get product ID from navigation route
  const route = useRoute();
  const dispatch = useDispatch();
  const { productId } = route.params;

  // Local quantity state
  const [quantity, setQuantity] = useState(1);

  // SQLite hooks
  const { saveCartItem } = useSQLite();

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
   * Handles quantity change from ButtonCount component
   */
  const handleQuantityChange = (newCount) => {
    setQuantity(newCount);
  };

  /**
   * Validates quantity against available stock
   */
  const isQuantityValid = (q, stock) => {
    if (q <= 0) {
      Alert.alert("Cantidad inválida", "La cantidad debe ser mayor a 0.");
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
   */
  const handleAddToCart = withErrorHandling(
    async () => {
      if (!isQuantityValid(quantity, product.stock)) return;

      const itemToAdd = { ...product, quantity };
      const result = await dispatch(safeAddItemToCart(itemToAdd));
      if (!result) {
        Alert.alert("Error", "No se pudo agregar al carrito.");
        return;
      }

      // Save to SQLite database
      await saveCartItem({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: quantity,
        image: product.mainImage,
      });

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
    },
    "ProductDetail.handleAddToCart",
    { showAlert: false }
  );

  return (
    <ScrollView style={styles.container}>
      <Image
        source={product.mainImage}
        style={styles.image}
        contentFit="cover"
        transition={300}
        cachePolicy="memory-disk"
      />

      <Card variant="featured" elevated>
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

          <Button
            title="Agregar al carrito"
            variant="primary"
            size="large"
            onPress={handleAddToCart}
            style={styles.addButton}
          />
        </View>
      </Card>
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  image: {
    width: "100%",
    height: 320,
    backgroundColor: colors.white,
  },
  content: {
    gap: 20,
    margin: 20,
  },
  title: {
    fontFamily: "Inter_18pt-Bold",
    fontSize: 24,
    color: colors.textPrimary,
    letterSpacing: 0.3,
    lineHeight: 30,
  },
  price: {
    fontFamily: "Inter_18pt-Bold",
    fontSize: 24,
    color: colors.primary,
    letterSpacing: 0.3,
  },
  stock: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 16,
    color: colors.gray600,
    letterSpacing: 0.2,
  },
  description: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 16,
    color: colors.gray600,
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  addButton: {
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.gray50,
  },
  errorText: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 16,
    color: colors.error,
    textAlign: "center",
    letterSpacing: 0.2,
  },
});
