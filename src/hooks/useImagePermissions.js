/**
 * @fileoverview Custom hook for managing image picker permissions.
 * Handles camera and media library permissions with proper error handling.
 * @author Stocchero
 * @version 1.0.0
 */

import { useState, useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import { handleError } from "../utils/errorHandler";

/**
 * Custom hook for managing image picker permissions.
 * Provides permission checking and requesting functionality with error handling.
 *
 * @returns {Object} Permission management utilities
 * @returns {boolean} returns.hasPermissions - Current permission status
 * @returns {function} returns.requestPermissions - Function to request permissions
 * @returns {boolean} returns.isChecking - Loading state for permission checks
 *
 * @example
 * ```javascript
 * const { hasPermissions, requestPermissions, isChecking } = useImagePermissions();
 *
 * const handleImageSelection = async () => {
 *   const granted = await requestPermissions();
 *   if (granted) {
 *     // Proceed with image selection
 *   }
 * };
 * ```
 */
export const useImagePermissions = () => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  /**
   * Requests camera and media library permissions.
   * Updates permission state and handles errors appropriately.
   *
   * @returns {Promise<boolean>} True if permissions are granted, false otherwise
   */
  const requestPermissions = useCallback(async () => {
    setIsChecking(true);

    try {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      const granted =
        cameraPermission.status === "granted" &&
        mediaLibraryPermission.status === "granted";

      setHasPermissions(granted);

      if (!granted) {
        handleError(
          new Error("Camera and media library permissions are required"),
          "useImagePermissions.requestPermissions",
          {
            showAlert: true,
            customMessage:
              "Necesitamos acceso a la cámara y galería para cambiar tu foto de perfil",
          }
        );
      }

      return granted;
    } catch (error) {
      handleError(error, "useImagePermissions.requestPermissions", {
        showAlert: true,
        customMessage: "Error al solicitar permisos de cámara y galería",
      });
      return false;
    } finally {
      setIsChecking(false);
    }
  }, []);

  return {
    hasPermissions,
    requestPermissions,
    isChecking,
  };
};
