/**
 * @fileoverview Categories screen component for displaying and filtering product categories.
 * Uses the modern UI system with consistent design.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { Image } from "expo-image";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, EmptyState } from "../../components/UI";
import Search from "../../components/Search";
import colors from "../../global/colors";
import {
  setSelectedCategory,
  setSearchKeyword,
} from "../../features/shop/shopSlice";
import { useGetCategoriesQuery } from "../../services/shop/shopApi";
import Loading from "../../components/Loading";

/**
 * Empty state component for when no categories match search
 * @param {Object} props - Component props
 * @param {string} props.keyword - Current search keyword
 * @returns {React.JSX.Element} Empty state component
 */
const EmptyComponent = ({ keyword }) => {
  const title = keyword
    ? `No se encontraron categorías para "${keyword}"`
    : "No hay categorías disponibles";

  const message = keyword
    ? "Intenta con otros términos de búsqueda"
    : "Explora nuestras categorías para encontrar productos increíbles";

  return (
    <EmptyState
      title={title}
      message={message}
      icon="grid-outline"
      variant="search"
    />
  );
};

/**
 * Categories screen component
 * @param {Object} props - Component props
 * @param {Object} props.navigation - React Navigation object
 * @returns {React.JSX.Element} Rendered categories screen
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
   */
  const handleSearch = (text) => {
    dispatch(setSearchKeyword(text));
  };

  // Normalize search keyword for case-insensitive filtering
  const normalizedKeyword = keyword.trim().toLowerCase();

  /**
   * Handles category selection and navigation to products
   */
  const handleCategoryPress = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
    navigation.navigate("Products", { categoryId });
  };

  /**
   * Handles navigation to store locator
   */
  const handleStoreLocator = () => {
    navigation.navigate("StoreLocator");
  };

  // Filter categories based on search keyword
  const filteredCategories = categories?.filter((category) =>
    category.title.toLowerCase().includes(normalizedKeyword)
  );

  /**
   * Renders individual category item in the FlatList
   */
  const renderCategoryItem = ({ item }) => (
    <Card
      variant="compact"
      onPress={() => handleCategoryPress(item.id)}
      elevated
    >
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
    </Card>
  );

  return (
    <View style={styles.container}>
      <Search keyword={keyword} setKeyword={handleSearch} />

      <Button
        title="Ver Ubicación de Tiendas"
        variant="primary"
        size="medium"
        onPress={handleStoreLocator}
        style={styles.locationButton}
      />

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
    backgroundColor: colors.gray50,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  title: {
    flex: 1,
    fontFamily: "Inter_18pt-SemiBold",
    fontSize: 17,
    lineHeight: 22,
    color: colors.textPrimary,
    letterSpacing: 0.2,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
  },
  locationButton: {
    marginTop: 20,
    marginBottom: 24,
  },
});
