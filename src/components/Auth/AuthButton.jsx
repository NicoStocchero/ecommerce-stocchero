/**
 * @fileoverview Authentication button component with loading states and accessibility.
 * Provides consistent styling for login, signup, and other authentication actions.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import colors from "../../global/colors";

/**
 * AuthButton component props
 * @typedef {Object} AuthButtonProps
 * @property {string} title - Button text to display
 * @property {function} onPress - Callback function when button is pressed
 * @property {boolean} [loading=false] - Whether to show loading spinner
 * @property {boolean} [disabled=false] - Whether the button is disabled
 */

/**
 * Reusable authentication button component with loading states and consistent styling.
 * Automatically handles disabled state during loading and provides accessibility support.
 *
 * @component
 * @param {AuthButtonProps} props - Component props
 * @returns {React.JSX.Element} Rendered authentication button
 *
 * @example
 * ```javascript
 * // Basic button
 * <AuthButton
 *   title="Iniciar Sesión"
 *   onPress={handleLogin}
 * />
 *
 * // Loading button
 * <AuthButton
 *   title="Registrarse"
 *   onPress={handleSignUp}
 *   loading={isLoading}
 *   disabled={isLoading}
 * />
 * ```
 */
const AuthButton = ({ title, onPress, loading, disabled }) => (
  <TouchableOpacity
    style={[styles.button, (loading || disabled) && styles.buttonDisabled]}
    onPress={onPress}
    disabled={loading || disabled}
    activeOpacity={0.85}
  >
    {loading ? (
      <ActivityIndicator color={colors.white} size="small" />
    ) : (
      <Text style={styles.buttonText}>{title}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    elevation: 1,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonDisabled: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontFamily: "Inter_28pt-Bold",
    fontSize: 16,
    color: colors.white,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default AuthButton;
