/**
 * @fileoverview Authentication Redux slice using Redux Toolkit.
 * Manages authentication state including user data, tokens, and error handling.
 * @author Stocchero
 * @version 1.0.0
 */

import { createSlice } from "@reduxjs/toolkit";

/**
 * Authentication state interface
 * @typedef {Object} AuthState
 * @property {Object|null} user - Currently authenticated user data
 * @property {string|null} token - JWT authentication token
 * @property {string|null} refreshToken - Refresh token for token renewal
 * @property {boolean} isAuthenticated - Authentication status flag
 * @property {string|null} error - Current error message if any
 */

/**
 * Redux slice for authentication state management.
 * Handles login, signup, logout, and error management actions.
 *
 * @example
 * ```javascript
 * import { authSuccess, authFailure, logout } from './authSlice';
 *
 * // Dispatch successful authentication
 * dispatch(authSuccess({ user: userData, token: 'jwt-token' }));
 *
 * // Handle authentication error
 * dispatch(authFailure('Invalid credentials'));
 * ```
 */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    /**
     * Handles successful authentication (login or signup).
     * Updates state with user data and authentication tokens.
     *
     * @param {AuthState} state - Current authentication state
     * @param {Object} action - Redux action object
     * @param {Object} action.payload - Authentication success payload
     * @param {Object} action.payload.user - User data from Firebase
     * @param {string} action.payload.token - JWT authentication token
     * @param {string} action.payload.refreshToken - Token for refreshing authentication
     */
    authSuccess: (state, action) => {
      const { user, token, refreshToken } = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.user = user;
      // eslint-disable-next-line no-param-reassign
      state.token = token;
      // eslint-disable-next-line no-param-reassign
      state.refreshToken = refreshToken;
      // eslint-disable-next-line no-param-reassign
      state.isAuthenticated = true;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
    },
    /**
     * Handles authentication failure (login or signup).
     * Clears user data and sets error message.
     *
     * @param {AuthState} state - Current authentication state
     * @param {Object} action - Redux action object
     * @param {string} action.payload - Error message describing the failure
     */
    authFailure: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.user = null;
      // eslint-disable-next-line no-param-reassign
      state.token = null;
      // eslint-disable-next-line no-param-reassign
      state.refreshToken = null;
      // eslint-disable-next-line no-param-reassign
      state.isAuthenticated = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
    /**
     * Handles user logout.
     * Clears all authentication data and resets state to initial values.
     *
     * @param {AuthState} state - Current authentication state
     */
    logout: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.user = null;
      // eslint-disable-next-line no-param-reassign
      state.token = null;
      // eslint-disable-next-line no-param-reassign
      state.refreshToken = null;
      // eslint-disable-next-line no-param-reassign
      state.isAuthenticated = false;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
    },
    /**
     * Clears current error message.
     * Used to dismiss error notifications or reset error state.
     *
     * @param {AuthState} state - Current authentication state
     */
    clearError: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.error = null;
    },
  },
});

// Export action creators
export const { authSuccess, authFailure, logout, clearError } =
  authSlice.actions;

// Export reducer for store configuration
export default authSlice.reducer;
