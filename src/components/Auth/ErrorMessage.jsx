/**
 * @fileoverview Error message component for displaying validation and authentication errors.
 * Uses the modern Card component with Nike-inspired design.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "../UI";
import colors from "../../global/colors";

/**
 * ErrorMessage component props
 * @typedef {Object} ErrorMessageProps
 * @property {string|null|undefined} message - Error message to display
 */

/**
 * Error message component using modern Card design
 * @param {ErrorMessageProps} props - Component props
 * @returns {React.JSX.Element|null} Rendered error message or null if no message
 */
const ErrorMessage = ({ message }) => {
  if (!message) return null;
  
  return (
    <Card variant="compact" elevated={false} style={styles.errorCard}>
      <Text style={styles.errorText}>{message}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  errorCard: {
    backgroundColor: colors.error,
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
