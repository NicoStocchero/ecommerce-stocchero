/**
 * @fileoverview Products screen component for displaying and filtering products by category.
 * Shows a searchable list of products with stock information and navigation to product details.
 * @author Stocchero
 * @version 1.0.0
 */

import { View, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useGetProductsByCategoryQuery } from "../../services/shop/shopApi";
import Loading from "../../components/Loading";
import Search from "../../components/Search";
import { ProductItem, ProductsEmpty } from "../../components/Shop";
import { useProductFiltering } from "../../hooks";
import colors from "../../global/colors";

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

  // Fetch products for the selected category
  const { data: products, isLoading: isLoadingProducts } =
    useGetProductsByCategoryQuery(categoryId);

  // Use custom hook for product filtering
  const { keyword, setKeyword, filteredProducts } =
    useProductFiltering(products);

  // Show loading state while fetching products
  if (isLoadingProducts) {
    return <Loading text="Cargando productos..." />;
  }

  /**
   * Renders individual product item in the FlatList
   * @param {Object} param - FlatList render item parameter
   * @param {Object} param.item - Product item data
   * @returns {React.JSX.Element} Rendered product item
   */
  const renderProductItem = ({ item }) => (
    <ProductItem
      item={item}
      onPress={() => {
        return navigation.navigate("ProductDetail", {
          productId: item.id,
        });
      }}
    />
  );

  return (
    <View style={styles.container}>
      <Search keyword={keyword} setKeyword={setKeyword} />
      <FlatList
        data={filteredProducts || []}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<ProductsEmpty keyword={keyword} />}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
