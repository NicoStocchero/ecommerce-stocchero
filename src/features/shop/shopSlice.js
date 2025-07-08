import { createSlice } from "@reduxjs/toolkit";
import categories from "../../data/categories.json";
import products from "../../data/products.json";

export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    categories: categories || [],
    products: products || [],
    selectedCategory: "",
    selectedProduct: {},
    productsFiltered: [],
    searchKeyword: "", // ⬅️ Agregar esto
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedCategory = action.payload;
    },
    setSelectedProduct: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedProduct = action.payload;
    },
    setProductsFiltered: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.productsFiltered = action.payload;
    },
    setSearchKeyword: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.searchKeyword = action.payload;
    },
  },
});

export const {
  setSelectedCategory,
  setSelectedProduct,
  setProductsFiltered,
  setSearchKeyword,
} = shopSlice.actions;
export default shopSlice.reducer;
