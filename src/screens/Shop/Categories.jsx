/**
 * @fileoverview Categories screen component for displaying and filtering product categories.
 * Shows a searchable list of product categories with navigation to products.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { Text, StyleSheet, View, FlatList, Pressable } from "react-native";
import { Image } from "expo-image";
import { useDispatch, useSelector } from "react-redux";
import FlatCard from "../../components/FlatCard";
import Search from "../../components/Search";
import colors from "../../global/colors";
import {
  setSelectedCategory,
  setSearchKeyword,
} from "../../features/shop/shopSlice";
import { useGetCategoriesQuery } from "../../services/shop/shopApi";
import Loading from "../../components/Loading";

/**
 * Empty state component for when no categories match search or no categories exist
 * @param {Object} props - Component props
 * @param {string} props.keyword - Current search keyword
 * @returns {React.JSX.Element} Empty state message
 */
const EmptyComponent = ({ keyword }) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>
      {keyword
        ? "No hay categorías que coincidan con tu búsqueda"
        : "No hay categorías disponibles"}
    </Text>
  </View>
);

/**
 * Categories screen component props
 * @typedef {Object} CategoriesProps
 * @property {Object} navigation - React Navigation object for screen navigation
 * @property {function} navigation.navigate - Function to navigate to other screens
 */

/**
 * Categories screen component for displaying and filtering product categories.
 * Provides a searchable grid of product categories with images and titles.
 * Handles category selection and navigation to products screen.
 *
 * Features:
 * - Real-time search filtering of categories
 * - RTK Query integration for data fetching
 * - Loading states with custom loading component
 * - Empty state handling for no results
 * - Category selection with Redux state management
 * - Navigation to products screen with category parameter
 * - Responsive FlatList with optimized rendering
 *
 * @component
 * @param {CategoriesProps} props - Component props
 * @returns {React.JSX.Element} Rendered categories screen
 *
 * @example
 * ```javascript
 * // Used in ShopStack navigator
 * <Stack.Screen
 *   name="Categories"
 *   component={Categories}
 *   options={{ headerTitle: "Categorías" }}
 * />
 *
 * // Navigation flow: Categories → Products
 * ```
 */
const Categories = ({ navigation }) => {
  // Redux hooks
  const dispatch = useDispatch();
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategoriesQuery();
  const keyword = useSelector((state) => state.shop.searchKeyword);

  // Show loading state while fetching categories
  if (isLoadingCategories) {
    return <Loading text="Cargando categorías..." />;
  }

  /**
   * Handles search input changes and updates Redux state
   * @param {string} text - New search keyword
   */
  const handleSearch = (text) => {
    dispatch(setSearchKeyword(text));
  };

  // Normalize search keyword for case-insensitive filtering
  const normalizedKeyword = keyword.trim().toLowerCase();

  /**
   * Handles category selection and navigation to products
   * @param {string} categoryId - Selected category ID
   */
  const handleCategoryPress = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
    navigation.navigate("Products", { categoryId });
  };

  // Filter categories based on search keyword
  const filteredCategories = categories?.filter((category) =>
    category.title.toLowerCase().includes(normalizedKeyword)
  );

  /**
   * Renders individual category item in the FlatList
   * @param {Object} param - FlatList render item parameter
   * @param {Object} param.item - Category item data
   * @returns {React.JSX.Element} Rendered category item
   */
  const renderCategoryItem = ({ item }) => (
    <Pressable onPress={() => handleCategoryPress(item.id)}>
      <FlatCard>
        <View style={styles.categoryItem}>
          <Image
            source={item.image}
            style={styles.image}
            contentFit="contain"
            transition={300}
            cachePolicy="memory-disk"
          />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </FlatCard>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Search keyword={keyword} setKeyword={handleSearch} />
      <FlatList
        data={filteredCategories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={
          filteredCategories.length === 0 ? styles.emptyList : null
        }
        ListEmptyComponent={<EmptyComponent keyword={keyword} />}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.gray100,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  title: {
    flex: 1,
    fontFamily: "Inter-SemiBold",
    fontSize: 17,
    lineHeight: 22,
    color: colors.textPrimary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    lineHeight: 22,
    color: colors.gray500,
    textAlign: "center",
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
