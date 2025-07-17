/**
 * @fileoverview Shop Redux slice using Redux Toolkit.
 * Manages shop state including selected category, product, and search functionality.
 * @author Stocchero
 * @version 1.0.0
 */

import { createSlice } from "@reduxjs/toolkit";

/**
 * Shop state interface
 * @typedef {Object} ShopState
 * @property {string} selectedCategory - Currently selected category ID
 * @property {Object} selectedProduct - Currently selected product details
 * @property {string} searchKeyword - Current search term for products
 */

/**
 * Redux slice for shop/catalog state management.
 * Handles category selection, product selection, and search functionality.
 * Used for navigation and filtering within the e-commerce application.
 *
 * @example
 * ```javascript
 * import { setSelectedCategory, setSelectedProduct, setSearchKeyword } from './shopSlice';
 *
 * // Select a category
 * dispatch(setSelectedCategory('electronics'));
 *
 * // Select a product for detail view
 * dispatch(setSelectedProduct({ id: '1', title: 'iPhone', price: 999 }));
 *
 * // Set search keyword
 * dispatch(setSearchKeyword('smartphone'));
 * ```
 */
export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    selectedCategory: "",
    selectedProduct: {},
    searchKeyword: "",
  },
  reducers: {
    /**
     * Sets the currently selected category.
     * Used for filtering products by category and navigation.
     *
     * @param {ShopState} state - Current shop state
     * @param {Object} action - Redux action object
     * @param {string} action.payload - Category ID to select
     */
    setSelectedCategory: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedCategory = action.payload;
    },
    /**
     * Sets the currently selected product.
     * Used for product detail view and navigation.
     *
     * @param {ShopState} state - Current shop state
     * @param {Object} action - Redux action object
     * @param {Object} action.payload - Product object to select
     */
    setSelectedProduct: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedProduct = action.payload;
    },
    /**
     * Sets the filtered products array.
     * Used for storing search/filter results.
     *
     * @param {ShopState} state - Current shop state
     * @param {Object} action - Redux action object
     * @param {Array} action.payload - Array of filtered products
     */
    setProductsFiltered: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.productsFiltered = action.payload;
    },
    /**
     * Sets the search keyword for product filtering.
     * Used for text-based product search functionality.
     *
     * @param {ShopState} state - Current shop state
     * @param {Object} action - Redux action object
     * @param {string} action.payload - Search keyword/term
     */
    setSearchKeyword: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.searchKeyword = action.payload;
    },
  },
});

// Export action creators
export const {
  setSelectedCategory,
  setSelectedProduct,
  setProductsFiltered,
  setSearchKeyword,
} = shopSlice.actions;

// Export reducer for store configuration
export default shopSlice.reducer;
