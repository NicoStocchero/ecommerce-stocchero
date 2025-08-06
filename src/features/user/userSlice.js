/**
 * @fileoverview Unified user state management using Redux Toolkit.
 * Combines authentication and profile state in a single, coherent slice.
 * Eliminates state fragmentation between auth and profile.
 * @author Stocchero
 * @version 1.0.0
 */

import { createSlice } from "@reduxjs/toolkit";

/**
 * Unified user state interface
 * @typedef {Object} UserState
 * @property {Object|null} user - Currently authenticated user data
 * @property {string|null} token - JWT authentication token
 * @property {string|null} refreshToken - Refresh token for token renewal
 * @property {boolean} isAuthenticated - Authentication status flag
 * @property {string|null} profileImage - User's profile picture URI
 * @property {Object|null} profileData - Extended user profile data
 * @property {boolean} isUpdatingImage - Loading state for image updates
 * @property {string|null} error - Current error message if any
 * @property {string} errorType - Type of error (AUTH, PROFILE, NETWORK, etc.)
 */

/**
 * Unified Redux slice for user state management.
 * Handles authentication, profile data, and error management in a single slice.
 * Eliminates the need for separate auth and profile slices.
 *
 * @example
 * ```javascript
 * import {
 *   authSuccess,
 *   updateProfileImage,
 *   setProfileData,
 *   logout
 * } from './userSlice';
 *
 * // Authentication
 * dispatch(authSuccess({ user: userData, token: 'jwt-token' }));
 *
 * // Profile management
 * dispatch(updateProfileImage('data:image/jpeg;base64,...'));
 * dispatch(setProfileData({ displayName: 'John Doe' }));
 *
 * // Logout (clears everything)
 * dispatch(logout());
 * ```
 */
const userSlice = createSlice({
  name: "user",
  initialState: {
    // Authentication state
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,

    // Profile state
    profileImage: null,
    profileData: null,
    isUpdatingImage: false,

    // Error state
    error: null,
    errorType: null,
  },
  reducers: {
    /**
     * Handles successful authentication (login or signup).
     * Updates state with user data and authentication tokens.
     *
     * @param {UserState} state - Current user state
     * @param {Object} action - Redux action object
     * @param {Object} action.payload - Authentication success payload
     * @param {Object} action.payload.user - User data from Firebase
     * @param {string} action.payload.token - JWT authentication token
     * @param {string} action.payload.refreshToken - Token for refreshing authentication
     */
    authSuccess: (state, action) => {
      const { user, token, refreshToken } = action.payload;
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.error = null;
      state.errorType = null;
    },

    /**
     * Handles authentication failure (login or signup).
     * Clears user data and sets error message.
     *
     * @param {UserState} state - Current user state
     * @param {Object} action - Redux action object
     * @param {string} action.payload - Error message describing the failure
     */
    authFailure: (state, action) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.profileImage = null;
      state.profileData = null;
      state.error = action.payload;
      state.errorType = "AUTH";
    },

    /**
     * Updates user's profile image.
     * Sets the profile image URI and clears any profile-related errors.
     *
     * @param {UserState} state - Current user state
     * @param {Object} action - Redux action object
     * @param {string} action.payload - Profile image URI or base64 data
     */
    updateProfileImage: (state, action) => {
      state.profileImage = action.payload;
      state.error = null;
      state.errorType = null;
    },

    /**
     * Sets the loading state for image updates.
     * Used to show loading indicators during image upload/processing.
     *
     * @param {UserState} state - Current user state
     * @param {Object} action - Redux action object
     * @param {boolean} action.payload - Loading state value
     */
    setIsUpdatingImage: (state, action) => {
      state.isUpdatingImage = action.payload;
    },

    /**
     * Updates user profile data.
     * Merges new data with existing profile data.
     *
     * @param {UserState} state - Current user state
     * @param {Object} action - Redux action object
     * @param {Object} action.payload - Profile data to update
     */
    setProfileData: (state, action) => {
      state.profileData = {
        ...state.profileData,
        ...action.payload,
      };
      state.error = null;
      state.errorType = null;
    },

    /**
     * Sets profile error message.
     * Used for handling profile-related errors (image upload, data updates, etc.).
     *
     * @param {UserState} state - Current user state
     * @param {Object} action - Redux action object
     * @param {Object} action.payload - Error information
     * @param {string} action.payload.message - Error message
     * @param {string} action.payload.type - Error type (PROFILE, NETWORK, etc.)
     */
    setProfileError: (state, action) => {
      state.error = action.payload.message;
      state.errorType = action.payload.type || "PROFILE";
    },

    /**
     * Clears current error message.
     * Used to dismiss error notifications or reset error state.
     *
     * @param {UserState} state - Current user state
     */
    clearError: (state) => {
      state.error = null;
      state.errorType = null;
    },

    /**
     * Handles user logout.
     * Clears all user data and resets state to initial values.
     *
     * @param {UserState} state - Current user state
     */
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.profileImage = null;
      state.profileData = null;
      state.isUpdatingImage = false;
      state.error = null;
      state.errorType = null;
    },

    /**
     * Resets profile state to initial values.
     * Used during profile reset operations while keeping authentication.
     *
     * @param {UserState} state - Current user state
     */
    resetProfile: (state) => {
      state.profileImage = null;
      state.profileData = null;
      state.isUpdatingImage = false;
      state.error = null;
      state.errorType = null;
    },
  },
});

// Export action creators
export const {
  authSuccess,
  authFailure,
  updateProfileImage,
  setIsUpdatingImage,
  setProfileData,
  setProfileError,
  clearError,
  logout,
  resetProfile,
} = userSlice.actions;

// Export reducer for store configuration
export default userSlice.reducer;
