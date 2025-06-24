import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import products from "../data/products.json";
import FlatCard from "../components/FlatCard";
import { colors } from "../global/colors";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { useState } from "react";
import Search from "../components/Search";

const Products = () => {
  const route = useRoute();
  const { categoryId } = route.params;
  const [keyword, setKeyword] = useState("");
  const navigation = useNavigation();

  const normalizedKeyword = keyword.trim().toLowerCase();

  const productsFiltered = products.filter(
    (product) =>
      product.categoryId === categoryId &&
      product.title.toLowerCase().includes(normalizedKeyword)
  );

  const renderProductItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      <FlatCard style={styles.productItem}>
        <Image
          source={item.mainImage}
          style={styles.image}
          contentFit="contain"
          transition={300}
          cachePolicy="memory-disk"
        />
        <View style={styles.productInfo}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${item.price.toLocaleString()}</Text>
            <Text style={styles.discount}>{item.discount}% OFF</Text>
          </View>
          <Text style={styles.description}>{item.shortDescription}</Text>
        </View>
      </FlatCard>
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <Search keyword={keyword} setKeyword={setKeyword} />
      <FlatList
        data={productsFiltered || []}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {keyword
                ? "No hay productos que coincidan con tu búsqueda"
                : "No hay productos disponibles para esta categoría"}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  productItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 20,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
  },
  productInfo: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    color: colors.black,
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  price: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    color: "#2e7d32", // verde fuerte para destacar precio
  },
  discount: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#d32f2f", // rojo pro, sin ser agresivo
    backgroundColor: "#ffe5e5",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: "hidden",
  },
  description: {
    fontFamily: "Inter-Regular",
    fontSize: 13,
    color: colors.gray,
    lineHeight: 18,
  },
  emptyContainer: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: colors.gray,
    textAlign: "center",
  },
});
