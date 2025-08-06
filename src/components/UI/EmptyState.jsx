/**
 * @fileoverview Modern empty state component with consistent design.
 * Displays empty state messages with clean, attractive styling.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../global/colors";

/**
 * EmptyState component props
 * @typedef {Object} EmptyStateProps
 * @property {string} title - Main title text
 * @property {string} message - Description message
 * @property {string} [icon="search-outline"] - Ionicons icon name
 * @property {string} [variant="default"] - Variant (default, search, cart, orders)
 */

/**
 * Modern empty state component with consistent design
 * @param {EmptyStateProps} props - Component props
 * @returns {React.JSX.Element} Rendered empty state
 */
const EmptyState = ({
  title,
  message,
  icon = "search-outline",
  variant = "default",
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={48} color={colors.gray400} />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: colors.gray100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  title: {
    fontFamily: "Inter_18pt-Bold",
    fontSize: 20,
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  message: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 16,
    color: colors.gray600,
    textAlign: "center",
    lineHeight: 24,
    letterSpacing: 0.2,
  },
});

export default EmptyState;
