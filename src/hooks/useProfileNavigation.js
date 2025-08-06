/**
 * @fileoverview Custom hook for managing profile navigation actions.
 * Handles navigation to different profile-related screens and actions.
 * @author Stocchero
 * @version 1.0.0
 */

import { useCallback } from "react";
import { Alert } from "react-native";

/**
 * Custom hook for managing profile navigation actions.
 * Provides navigation functions for different profile-related screens.
 *
 * @param {Object} navigation - React Navigation object
 * @returns {Object} Navigation action utilities
 * @returns {function} returns.handleEditProfile - Navigate to edit profile
 * @returns {function} returns.handleChangePassword - Navigate to change password
 * @returns {function} returns.handleAppSettings - Navigate to app settings
 * @returns {function} returns.handleOrderHistory - Navigate to order history
 * @returns {function} returns.handleHelpSupport - Navigate to help and support
 *
 * @example
 * ```javascript
 * const navigation = useNavigation();
 * const { handleEditProfile, handleOrderHistory } = useProfileNavigation(navigation);
 *
 * const onEditProfilePress = () => {
 *   handleEditProfile();
 * };
 * ```
 */
export const useProfileNavigation = (navigation) => {
  /**
   * Handles navigation to edit profile screen.
   * Shows placeholder alert for future implementation.
   */
  const handleEditProfile = useCallback(() => {
    Alert.alert(
      "Función pendiente",
      "La edición de perfil se implementará próximamente"
    );
  }, []);

  /**
   * Handles navigation to change password screen.
   * Shows placeholder alert for future implementation.
   */
  const handleChangePassword = useCallback(() => {
    Alert.alert(
      "Función pendiente",
      "El cambio de contraseña se implementará próximamente"
    );
  }, []);

  /**
   * Handles navigation to app settings screen.
   * Shows placeholder alert for future implementation.
   */
  const handleAppSettings = useCallback(() => {
    Alert.alert(
      "Función pendiente",
      "La configuración de la app se implementará próximamente"
    );
  }, []);

  /**
   * Handles navigation to order history screen.
   * Navigates to the Orders tab.
   */
  const handleOrderHistory = useCallback(() => {
    navigation.navigate("Pedidos");
  }, [navigation]);

  /**
   * Handles navigation to help and support screen.
   * Shows placeholder alert for future implementation.
   */
  const handleHelpSupport = useCallback(() => {
    Alert.alert(
      "Función pendiente",
      "El soporte técnico se implementará próximamente"
    );
  }, []);

  return {
    handleEditProfile,
    handleChangePassword,
    handleAppSettings,
    handleOrderHistory,
    handleHelpSupport,
  };
};
