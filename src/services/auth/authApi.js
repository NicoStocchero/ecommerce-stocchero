/**
 * @fileoverview Authentication API service using RTK Query for Firebase Authentication.
 * Provides mutations for user registration and login operations.
 * @author Stocchero
 * @version 1.0.0
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Environment variables for Firebase configuration
const baseAuthURL = process.env.EXPO_PUBLIC_AUTH_BASE_URL;
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

/**
 * RTK Query API slice for authentication operations.
 * Handles user registration and login with Firebase Authentication REST API.
 *
 * @example
 * ```javascript
 * import { useLoginMutation, useSignUpMutation } from './authApi';
 *
 * const [login, { isLoading, error }] = useLoginMutation();
 * const result = await login({ email: 'user@example.com', password: 'password' });
 * ```
 */
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseAuthURL }),
  endpoints: (builder) => ({
    /**
     * Mutation for user registration with Firebase Authentication.
     * Creates a new user account with email and password.
     *
     * @mutation
     * @param {Object} auth - Authentication credentials
     * @param {string} auth.email - User's email address
     * @param {string} auth.password - User's password
     * @param {boolean} auth.returnSecureToken - Whether to return secure token
     * @returns {Promise<Object>} Firebase authentication response
     * @throws {Object} Firebase error response
     */
    signUp: builder.mutation({
      query: (auth) => ({
        url: `/accounts:signUp?key=${apiKey}`,
        method: "POST",
        body: auth,
      }),
    }),
    /**
     * Mutation for user login with Firebase Authentication.
     * Authenticates existing user with email and password.
     *
     * @mutation
     * @param {Object} auth - Authentication credentials
     * @param {string} auth.email - User's email address
     * @param {string} auth.password - User's password
     * @param {boolean} auth.returnSecureToken - Whether to return secure token
     * @returns {Promise<Object>} Firebase authentication response with tokens
     * @throws {Object} Firebase error response
     */
    login: builder.mutation({
      query: (auth) => ({
        url: `/accounts:signInWithPassword?key=${apiKey}`,
        method: "POST",
        body: auth,
      }),
    }),
  }),
});

// Export hooks for use in components
export const { useSignUpMutation, useLoginMutation } = authApi;
