import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseAuthURL = process.env.EXPO_PUBLIC_AUTH_BASE_URL;
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseAuthURL }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (auth) => ({
        url: `/accounts:signUp?key=${apiKey}`,
        method: "POST",
        body: auth,
      }),
    }),
    login: builder.mutation({
      query: (auth) => ({
        url: `/accounts:signInWithPassword?key=${apiKey}`,
        method: "POST",
        body: auth,
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = authApi;
