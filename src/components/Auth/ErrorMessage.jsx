/**
 * @fileoverview Error message component for displaying validation and authentication errors.
 * Provides consistent error styling and conditional rendering.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../global/colors";

/**
 * ErrorMessage component props
 * @typedef {Object} ErrorMessageProps
 * @property {string|null|undefined} message - Error message to display
 */

/**
 * Reusable error message component for displaying validation and authentication errors.
 * Conditionally renders based on message presence with consistent styling.
 *
 * @component
 * @param {ErrorMessageProps} props - Component props
 * @returns {React.JSX.Element|null} Rendered error message or null if no message
 *
 * @example
 * ```javascript
 * // Display authentication error
 * <ErrorMessage message={authError} />
 *
 * // Display validation error
 * <ErrorMessage message="El email es requerido" />
 *
 * // No error (component returns null)
 * <ErrorMessage message={null} />
 * ```
 */
const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: colors.error,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontFamily: "Inter_18pt-Medium",
    fontSize: 14,
    color: colors.white,
    textAlign: "center",
  },
});

export default ErrorMessage;
