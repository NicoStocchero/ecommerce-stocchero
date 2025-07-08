// src/screens/Shop/ProductDetail.jsx
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
import { colors } from "../../global/colors";
import ButtonCount from "../../components/ButtonCount";
import { safeAddItemToCart } from "../../features/cart/cartThunks";

const ProductDetail = ({ navigation }) => {
  const route = useRoute();
  const { product } = route.params;
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newCount) => {
    setQuantity(newCount);
  };

  const handleAddToCart = () => {
    if (quantity > product.stock) {
      Alert.alert("Stock insuficiente", "No hay suficiente stock disponible.");
      return;
    }

    const itemToAdd = {
      ...product,
      quantity,
    };
    const success = dispatch(safeAddItemToCart(itemToAdd));
    if (!success) {
      Alert.alert("Stock insuficiente", "No hay suficiente stock disponible.");
      return;
    }
    navigation.navigate("Carrito");
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
