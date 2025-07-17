import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseRTDBURL = process.env.EXPO_PUBLIC_BASE_RTDB_URL;

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseRTDBURL }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/categories.json",
    }),
    getProductsByCategory: builder.query({
      query: () => "/products.json",
      transformResponse: (response, meta, arg) => {
        return Object.values(response).filter(
          (product) => product.categoryId === arg
        );
      },
    }),
    getProductById: builder.query({
      query: (id) => "/products.json",
      transformResponse: (response, _, id) => {
        const products = Object.values(response);
        return products.find((prod) => prod.id === id);
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
} = shopApi;
