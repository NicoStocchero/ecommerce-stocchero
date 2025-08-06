/**
 * @fileoverview Profile API service using RTK Query for Firebase Realtime Database.
 * Handles profile image upload to Firebase Realtime Database and profile data management.
 * Uses Firebase REST API for consistent approach with other services.
 * @author Stocchero
 * @version 1.0.0
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as FileSystem from "expo-file-system";
import {
  createErrorResponse,
  createSuccessResponse,
  validateRequiredParams,
  withServiceErrorHandling,
} from "../errorService";

// Environment variable for Firebase Realtime Database URL
const baseRTDBURL = process.env.EXPO_PUBLIC_BASE_RTDB_URL;

/**
 * RTK Query API slice for profile data operations.
 * Handles profile image upload and profile data management using Firebase REST API.
 *
 * @example
 * ```javascript
 * import { useUploadProfileImageMutation, useGetProfileDataQuery } from './profileApi';
 *
 * // Upload profile image
 * const [uploadImage, { isLoading }] = useUploadProfileImageMutation();
 * await uploadImage({ imageUri, userId });
 *
 * // Get profile data
 * const { data: profileData } = useGetProfileDataQuery(userId);
 * ```
 */
export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseRTDBURL }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    /**
     * Uploads profile image to Firebase Realtime Database.
     * Stores image as base64 string in RTDB.
     *
     * @mutation
     * @param {Object} params - Upload parameters
     * @param {string} params.imageUri - Local image URI
     * @param {string} params.userId - User ID for storage path
     * @param {string} params.authToken - Firebase auth token
     * @returns {Promise<string>} Base64 encoded image data
     */
    uploadProfileImage: builder.mutation({
      queryFn: withServiceErrorHandling(
        async ({ imageUri, userId, authToken }) => {
          // Validate required parameters
          validateRequiredParams(
            { imageUri, userId, authToken },
            ["imageUri", "userId", "authToken"],
            "uploadProfileImage"
          );

          // Convert image to base64 using expo-file-system
          const base64Data = await FileSystem.readAsStringAsync(imageUri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          // Create data URL for proper image format
          const dataUrl = `data:image/jpeg;base64,${base64Data}`;

          // Save to Firebase Realtime Database
          const profileData = {
            profileImage: dataUrl,
            updatedAt: new Date().toISOString(),
          };

          const rtdbResponse = await fetch(
            `${baseRTDBURL}/users/${userId}/profile.json?auth=${authToken}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(profileData),
            }
          );

          if (!rtdbResponse.ok) {
            const errorText = await rtdbResponse.text();
            throw new Error(
              `Failed to save profile image to RTDB: ${rtdbResponse.status} - ${errorText}`
            );
          }

          await rtdbResponse.json();
          return createSuccessResponse(dataUrl);
        },
        "PROFILE",
        "imageUpload"
      ),
      invalidatesTags: ["Profile"],
    }),

    /**
     * Fetches user profile data from Firebase Realtime Database.
     *
     * @query
     * @param {string} userId - User ID to fetch profile for
     * @param {string} authToken - Firebase auth token
     * @returns {Promise<Object>} User profile data
     */
    getProfileData: builder.query({
      query: ({ userId, authToken }) =>
        `/users/${userId}/profile.json?auth=${authToken}`,
      transformResponse: (response) => {
        return response || { profileImage: null, updatedAt: null };
      },
      providesTags: ["Profile"],
    }),

    /**
     * Updates user profile data in Firebase Realtime Database.
     *
     * @mutation
     * @param {Object} params - Update parameters
     * @param {string} params.userId - User ID
     * @param {Object} params.data - Profile data to update
     * @param {string} params.authToken - Firebase auth token
     * @returns {Promise<Object>} Updated profile data
     */
    updateProfileData: builder.mutation({
      queryFn: withServiceErrorHandling(
        async ({ userId, data, authToken }) => {
          // Validate required parameters
          validateRequiredParams(
            { userId, data, authToken },
            ["userId", "data", "authToken"],
            "updateProfileData"
          );

          const updatedData = {
            ...data,
            updatedAt: new Date().toISOString(),
          };

          const response = await fetch(
            `${baseRTDBURL}/users/${userId}/profile.json?auth=${authToken}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedData),
            }
          );

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
              `Failed to update profile data: ${response.status} - ${errorText}`
            );
          }

          const result = await response.json();

          // Return the data in the correct format for RTK Query
          return { data: result };
        },
        "PROFILE",
        "profileUpdate"
      ),
      invalidatesTags: ["Profile"],
    }),
  }),
});

// Export hooks for use in components
export const {
  useUploadProfileImageMutation,
  useGetProfileDataQuery,
  useUpdateProfileDataMutation,
} = profileApi;
