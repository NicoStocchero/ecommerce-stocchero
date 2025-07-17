/**
 * @fileoverview Shop API service using RTK Query for Firebase Realtime Database.
 * Provides queries for categories and products data with response transformations.
 * @author Stocchero
 * @version 1.0.0
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Environment variable for Firebase Realtime Database URL
const baseRTDBURL = process.env.EXPO_PUBLIC_BASE_RTDB_URL;

/**
 * RTK Query API slice for shop data operations.
 * Handles fetching categories and products from Firebase Realtime Database
 * with automatic caching and response transformations.
 *
 * @example
 * ```javascript
 * import { useGetCategoriesQuery, useGetProductsByCategoryQuery } from './shopApi';
 *
 * // Get all categories
 * const { data: categories, isLoading } = useGetCategoriesQuery();
 *
 * // Get products by category
 * const { data: products } = useGetProductsByCategoryQuery('electronics');
 * ```
 */
export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseRTDBURL }),
  endpoints: (builder) => ({
    /**
     * Query to fetch all product categories.
     * Returns raw categories data from Firebase.
     *
     * @query
     * @returns {Promise<Object>} Categories data from Firebase
     */
    getCategories: builder.query({
      query: () => "/categories.json",
    }),
    /**
     * Query to fetch products filtered by category.
     * Fetches all products and filters by categoryId on the client side.
     *
     * @query
     * @param {string} categoryId - Category ID to filter products
     * @returns {Promise<Array>} Array of products belonging to the category
     */
    getProductsByCategory: builder.query({
      query: () => "/products.json",
      transformResponse: (response, meta, arg) => {
        return Object.values(response).filter(
          (product) => product.categoryId === arg
        );
      },
    }),
    /**
     * Query to fetch a single product by its ID.
     * Fetches all products and finds the specific product by ID.
     *
     * @query
     * @param {string} productId - Product ID to fetch
     * @returns {Promise<Object|undefined>} Product object or undefined if not found
     */
    getProductById: builder.query({
      query: (id) => "/products.json",
      transformResponse: (response, _, id) => {
        const products = Object.values(response);
        return products.find((prod) => prod.id === id);
      },
    }),
  }),
});

// Export hooks for use in components
export const {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
} = shopApi;
