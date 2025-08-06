/**
 * @fileoverview Modern card component with consistent design.
 * Provides consistent card styling across the application.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import colors from "../../global/colors";

/**
 * Card component props
 * @typedef {Object} CardProps
 * @property {React.ReactNode} children - Content to render inside the card
 * @property {Object} [style] - Additional styles to apply
 * @property {function} [onPress] - Callback when card is pressed
 * @property {boolean} [elevated=true] - Whether to show shadow/elevation
 * @property {string} [variant="default"] - Card variant (default, compact, featured)
 */

/**
 * Modern card component with consistent design
 * @param {CardProps} props - Component props
 * @returns {React.JSX.Element} Rendered card component
 */
const Card = ({
  children,
  style,
  onPress,
  elevated = true,
  variant = "default",
}) => {
  const cardStyle = [
    styles.card,
    styles[variant],
    elevated && styles.elevated,
    style,
  ];

  if (onPress) {
    return (
      <Pressable style={cardStyle} onPress={onPress} activeOpacity={0.95}>
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.gray100,
  },
  default: {
    padding: 24,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  compact: {
    padding: 20,
    marginVertical: 6,
    marginHorizontal: 12,
  },
  featured: {
    padding: 28,
    marginVertical: 12,
    marginHorizontal: 16,
  },
  elevated: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
});

export default Card;
