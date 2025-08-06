/**
 * @fileoverview Custom hook for managing profile image operations.
 * Handles image selection, upload, and state management with proper error handling.
 * @author Stocchero
 * @version 1.0.0
 */

import { useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { useUploadProfileImageMutation } from "../services";
import { useSQLite } from "./useSQLite";
import { useAuthToken } from "./useAuthToken";
import {
  updateProfileImage,
  setIsUpdatingImage,
} from "../features/user/userSlice";
import { handleError, withErrorHandling } from "../utils/errorHandler";
import { useImagePermissions } from "./useImagePermissions";

/**
 * Custom hook for managing profile image operations.
 * Provides image selection, upload, and state management functionality.
 *
 * @returns {Object} Profile image management utilities
 * @returns {function} returns.selectImage - Function to select image from camera/gallery
 * @returns {boolean} returns.isUpdating - Loading state for image operations
 * @returns {string|null} returns.profileImage - Current profile image URI
 *
 * @example
 * ```javascript
 * const { selectImage, isUpdating, profileImage } = useProfileImage();
 *
 * const handleImageSelection = () => {
 *   selectImage('camera'); // or 'gallery'
 * };
 * ```
 */
export const useProfileImage = () => {
  const dispatch = useDispatch();
  const { user, profileImage, isUpdatingImage } = useSelector(
    (state) => state.user
  );
  const { getSession, saveSession } = useSQLite();
  const { session, freshToken } = useAuthToken();
  const [uploadProfileImage] = useUploadProfileImageMutation();
  const { requestPermissions } = useImagePermissions();

  /**
   * Image picker configuration options
   */
  const imagePickerOptions = {
    mediaTypes: "images",
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  };

  /**
   * Launches image picker based on source type.
   * Handles camera or gallery image selection.
   *
   * @param {string} source - Source type: 'camera' or 'gallery'
   * @returns {Promise<Object|null>} Image picker result or null if cancelled
   */
  const launchImagePicker = useCallback(async (source) => {
    try {
      if (source === "camera") {
        return await ImagePicker.launchCameraAsync(imagePickerOptions);
      } else {
        return await ImagePicker.launchImageLibraryAsync(imagePickerOptions);
      }
    } catch (error) {
      handleError(error, "useProfileImage.launchImagePicker", {
        showAlert: true,
        customMessage: "Error al abrir la cámara o galería",
      });
      return null;
    }
  }, []);

  /**
   * Uploads image to Firebase and updates local state.
   * Handles the complete image upload workflow.
   *
   * @param {string} imageUri - Local image URI to upload
   * @returns {Promise<boolean>} True if upload successful, false otherwise
   */
  const uploadImage = useCallback(
    async (imageUri) => {
      try {
        // Check if we have valid authentication
        if (!session?.local_id || !freshToken) {
          throw new Error("No authentication available");
        }

        // Upload to Firebase Realtime Database
        const base64Data = await uploadProfileImage({
          imageUri,
          userId: session.local_id,
          authToken: freshToken,
        }).unwrap();

        // Update Redux state with base64 data
        dispatch(updateProfileImage(base64Data));

        // Save base64 data to local database
        const currentSession = await getSession();
        await saveSession({
          email: currentSession.email,
          localId: currentSession.local_id,
          token: currentSession.token,
          refreshToken: currentSession.refresh_token,
          profileImage: base64Data,
        });

        return true;
      } catch (error) {
        // Handle authentication errors specifically
        if (
          error?.status === 401 ||
          error?.status === 403 ||
          error?.message?.includes("Authentication failed")
        ) {
          handleError(error, "useProfileImage.uploadImage", {
            showAlert: true,
            customMessage:
              "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
          });
        } else if (error?.message?.includes("Failed to save profile image")) {
          handleError(error, "useProfileImage.uploadImage", {
            showAlert: true,
            customMessage:
              "Error de base de datos al subir la imagen. Intenta nuevamente.",
          });
        } else {
          handleError(error, "useProfileImage.uploadImage", {
            showAlert: true,
            customMessage: "Error al subir la imagen. Intenta nuevamente.",
          });
        }
        return false;
      }
    },
    [
      session?.local_id,
      freshToken,
      uploadProfileImage,
      dispatch,
      getSession,
      saveSession,
    ]
  );

  /**
   * Selects and processes image from camera or gallery.
   * Handles permissions, selection, and upload in a single workflow.
   *
   * @param {string} source - Source type: 'camera' or 'gallery'
   * @returns {Promise<boolean>} True if successful, false otherwise
   */
  const selectImage = useCallback(
    async (source) => {
      return withErrorHandling(
        async () => {
          dispatch(setIsUpdatingImage(true));

          // Check permissions first
          const hasPermissions = await requestPermissions();
          if (!hasPermissions) {
            return false;
          }

          // Launch image picker
          const result = await launchImagePicker(source);
          if (!result || result.canceled || !result.assets?.[0]) {
            return false;
          }

          // Upload and process image
          const success = await uploadImage(result.assets[0].uri);
          dispatch(setIsUpdatingImage(false)); // Stop loading
          return success;
        },
        "useProfileImage.selectImage",
        {
          showAlert: true,
          customMessage: "No se pudo procesar la imagen. Intenta nuevamente.",
          onError: () => {
            dispatch(setIsUpdatingImage(false));
          },
        }
      )();
    },
    [dispatch, requestPermissions, launchImagePicker, uploadImage]
  );

  return {
    selectImage,
    isUpdating: isUpdatingImage,
    profileImage,
  };
};
