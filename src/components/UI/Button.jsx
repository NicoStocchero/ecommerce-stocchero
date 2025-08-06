/**
 * @fileoverview Modern button component with consistent design.
 * Provides consistent button styling across the application.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import colors from "../../global/colors";

/**
 * Button component props
 * @typedef {Object} ButtonProps
 * @property {string} title - Button text
 * @property {function} onPress - Callback when button is pressed
 * @property {string} [variant="primary"] - Button variant (primary, secondary, outline, ghost)
 * @property {string} [size="medium"] - Button size (small, medium, large)
 * @property {boolean} [loading=false] - Whether to show loading spinner
 * @property {boolean} [disabled=false] - Whether button is disabled
 * @property {Object} [style] - Additional styles to apply
 */

/**
 * Modern button component with consistent design
 * @param {ButtonProps} props - Component props
 * @returns {React.JSX.Element} Rendered button component
 */
const Button = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  style,
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[size],
    (loading || disabled) && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    (loading || disabled) && styles.disabledText,
  ];

  return (
    <Pressable
      style={({ pressed }) => [buttonStyle, pressed && styles.pressed]}
      onPress={onPress}
      disabled={loading || disabled}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? colors.white : colors.primary}
          size="small"
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    transform: [{ scale: 1 }],
  },
  // Variants
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.gray100,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.gray300,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  // Sizes
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    minHeight: 48,
  },
  large: {
    paddingHorizontal: 32,
    paddingVertical: 18,
    minHeight: 56,
  },
  // Text styles
  text: {
    fontFamily: "Inter_18pt-Bold",
    textAlign: "center",
  },
  primaryText: {
    color: colors.white,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  secondaryText: {
    color: colors.gray900,
    letterSpacing: 0.5,
  },
  outlineText: {
    color: colors.textPrimary,
    letterSpacing: 0.8,
  },
  ghostText: {
    color: colors.primary,
    letterSpacing: 0.8,
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 14,
  },
  // States
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
});

export default Button;
