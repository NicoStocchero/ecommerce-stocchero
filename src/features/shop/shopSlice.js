import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    selectedCategory: "",
    selectedProduct: {},
    searchKeyword: "",
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
