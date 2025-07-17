// src/screens/Shop/Categories.jsx
import React from "react";
import { Text, StyleSheet, View, FlatList, Pressable } from "react-native";
import { Image } from "expo-image";
import { useDispatch, useSelector } from "react-redux";
import FlatCard from "../../components/FlatCard";
import Search from "../../components/Search";
import { colors } from "../../global/colors";
import {
  setSelectedCategory,
  setSearchKeyword,
} from "../../features/shop/shopSlice";
import { useGetCategoriesQuery } from "../../services/shop/shopApi";
import Loading from "../../components/Loading";

const EmptyComponent = ({ keyword }) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>
      {keyword
        ? "No hay categorías que coincidan con tu búsqueda"
        : "No hay categorías disponibles"}
    </Text>
  </View>
);

const Categories = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategoriesQuery();
  const keyword = useSelector((state) => state.shop.searchKeyword);

  if (isLoadingCategories) {
    return <Loading text="Cargando categorías..." />;
  }

  // Cuando el usuario escribe:
  const handleSearch = (text) => {
    dispatch(setSearchKeyword(text));
  };

  const normalizedKeyword = keyword.trim().toLowerCase();

  const handleCategoryPress = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
    navigation.navigate("Products", { categoryId });
  };

  const filteredCategories = categories?.filter((category) =>
    category.title.toLowerCase().includes(normalizedKeyword)
  );

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
