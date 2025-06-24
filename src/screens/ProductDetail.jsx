import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Image } from "expo-image";
import { colors } from "../global/colors";
import { useRoute } from "@react-navigation/native";
import ButtonCount from "../components/ButtonCount";

const ProductDetail = () => {
  const route = useRoute();
  const { product } = route.params;

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
        <ButtonCount />
        <Pressable style={styles.button}>
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
    color: "#1a1a1a",
  },
  price: {
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
    color: "#2e7d32",
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
