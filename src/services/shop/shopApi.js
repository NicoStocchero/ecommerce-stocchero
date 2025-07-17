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
      query: (categoryId) => {
        const isNumber = typeof categoryId === "number";
        return `/products.json?orderBy="categoryId"&equalTo=${
          isNumber ? categoryId : `"${categoryId}"`
        }`;
      },
      transformResponse: (response) => {
        return Object.entries(response).map(([key, product]) => ({
          ...product,
          id: product.id ?? Number(key),
        }));
      },
    }),
  }),
});

export const { useGetCategoriesQuery, useGetProductsByCategoryQuery } = shopApi;
