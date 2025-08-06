import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getFirebaseErrorMessage } from "../../utils/firebaseErrorMessage";

/**
 * RTK Query API for Firebase Orders operations
 * Handles creating and retrieving orders from Firebase Realtime Database
 */
export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_BASE_RTDB_URL}/`,
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    /**
     * Create a new order in Firebase
     */
    createOrder: builder.mutation({
      query: ({ userId, order, token }) => ({
        url: `orders/${userId}.json?auth=${token}`,
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Orders"],
      transformErrorResponse: (response) => {
        return getFirebaseErrorMessage(response.data?.error?.message);
      },
    }),

    /**
     * Get all orders for a specific user
     */
    getOrders: builder.query({
      query: ({ userId, token }) => ({
        url: `orders/${userId}.json?auth=${token}`,
      }),
      providesTags: ["Orders"],
      transformResponse: (response) => {
        if (!response) return [];

        // Convert Firebase object to array with IDs
        return Object.entries(response).map(([id, order]) => ({
          id,
          ...order,
        }));
      },
      transformErrorResponse: (response) => {
        return getFirebaseErrorMessage(response.data?.error?.message);
      },
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersQuery } = ordersApi;
