/**
 * @fileoverview Products screen component for displaying and filtering products by category.
 * Shows a searchable list of products with stock information and navigation to product details.
 * @author Stocchero
 * @version 1.0.0
 */

import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import { useState, useCallback } from "react";
import FlatCard from "../../components/FlatCard";
import colors from "../../global/colors";
import Search from "../../components/Search";
import { useGetProductsByCategoryQuery } from "../../services/shop/shopApi";
import Loading from "../../components/Loading";

/**
 * Empty state component for when no products match search or category has no products
 * @param {Object} props - Component props
 * @param {string} props.keyword - Current search keyword
 * @returns {React.JSX.Element} Empty state message
 */
const EmptyProductComponent = ({ keyword }) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>
      {keyword
        ? "No hay productos que coincidan con tu búsqueda"
        : "No hay productos disponibles para esta categoría"}
    </Text>
  </View>
);

/**
 * Products screen component props
 * @typedef {Object} ProductsProps
 * @property {Object} navigation - React Navigation object for screen navigation
 * @property {function} navigation.navigate - Function to navigate to other screens
 * @property {Object} route - React Navigation route object with parameters
 * @property {Object} route.params - Route parameters
 * @property {string} route.params.categoryId - Selected category ID
 */

/**
 * Products screen component for displaying and filtering products by category.
 * Shows a searchable list of products with images, prices, descriptions, and stock status.
 * Handles product selection and navigation to product details.
 *
 * Features:
 * - Real-time search filtering of products within category
 * - RTK Query integration for category-specific product fetching
 * - Stock status indicators (out of stock, last unit, few units left)
 * - Discount badges for products on sale
 * - Loading states with custom loading component
 * - Empty state handling for no results
 * - Navigation to product detail screen
 * - Search keyword reset on screen focus
 * - Responsive FlatList with optimized rendering
 *
 * @component
 * @param {ProductsProps} props - Component props
 * @returns {React.JSX.Element} Rendered products screen
 *
 * @example
 * ```javascript
 * // Used in ShopStack navigator
 * <Stack.Screen
 *   name="Products"
 *   component={Products}
 *   options={{ headerTitle: "Productos" }}
 * />
 *
 * // Navigation flow: Categories → Products → ProductDetail
 * navigation.navigate("Products", { categoryId: "electronics" });
 * ```
 */
const Products = ({ navigation }) => {
  // Get category ID from navigation route
  const route = useRoute();
  const { categoryId } = route.params;

  // Local search state
  const [keyword, setKeyword] = useState("");

  // Normalize search keyword for filtering
  const normalizedKeyword = keyword.trim().toLowerCase();

  // Fetch products for the selected category
  const { data: products, isLoading: isLoadingProducts } =
    useGetProductsByCategoryQuery(categoryId);

  /**
   * Reset search keyword when screen comes into focus
   * Provides clean state when navigating back to this screen
   */
  useFocusEffect(
    useCallback(() => {
      return () => {
        setKeyword("");
      };
    }, [])
  );

  // Show loading state while fetching products
  if (isLoadingProducts) {
    return <Loading text="Cargando productos..." />;
  }

  // Filter products based on search keyword
  const productsFiltered = products?.filter((product) =>
    product.title.toLowerCase().includes(normalizedKeyword)
  );

  /**
   * Renders individual product item in the FlatList
   * Includes stock status indicators and product information
   * @param {Object} param - FlatList render item parameter
   * @param {Object} param.item - Product item data
   * @returns {React.JSX.Element} Rendered product item
   */
  const renderProductItem = ({ item }) => {
    // Calculate stock status for display
    const outOfStock = item.stock === 0;
    const lastUnit = item.stock === 1;
    const fewUnitsLeft = item.stock > 1 && item.stock < 10;

    return (
      <Pressable
        onPress={() => {
          return navigation.navigate("ProductDetail", {
            productId: item.id,
          });
        }}
        style={outOfStock ? styles.outOfStockItem : null}
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
              {item.discount > 0 && (
                <Text style={styles.discount}>{item.discount}% OFF</Text>
              )}
            </View>
            <Text style={styles.description}>{item.shortDescription}</Text>
            {lastUnit && (
              <Text style={styles.lastUnit}>¡Última unidad disponible!</Text>
            )}
            {outOfStock && (
              <Text style={styles.noStock}>Lo sentimos, no hay stock</Text>
            )}
            {fewUnitsLeft && (
              <Text style={styles.lastUnit}>
                ¡Quedan pocas unidades disponibles!
              </Text>
            )}
          </View>
        </FlatCard>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Search keyword={keyword} setKeyword={setKeyword} />
      <FlatList
        data={productsFiltered || []}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<EmptyProductComponent keyword={keyword} />}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 20,
    gap: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: colors.gray100,
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
    color: colors.success,
  },
  discount: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: colors.white,
    backgroundColor: colors.error,
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
  lastUnit: {
    marginTop: 4,
    fontFamily: "Inter-SemiBold",
    fontSize: 13,
    color: colors.error,
  },
  noStock: {
    marginTop: 4,
    fontFamily: "Inter-SemiBold",
    fontSize: 13,
    color: colors.gray,
  },
  outOfStockItem: {
    opacity: 0.5,
  },
});
