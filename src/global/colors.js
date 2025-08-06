/**
 * @fileoverview Global color palette for the Renace e-commerce application.
 * Defines consistent color scheme with orange primary brand colors and supporting colors.
 * @author Stocchero
 * @version 1.0.0
 */

/**
 * Global color palette configuration for the application.
 * Provides a comprehensive set of colors including brand colors, grays, semantic colors,
 * and utility colors for consistent UI design throughout the app.
 *
 * @namespace colors
 * @example
 * ```javascript
 * import colors from '../global/colors';
 *
 * // Using brand colors
 * backgroundColor: colors.primary,
 * color: colors.white,
 *
 * // Using semantic colors
 * borderColor: colors.error,
 * color: colors.success,
 *
 * // Using gray scale
 * color: colors.gray500,
 * backgroundColor: colors.gray100,
 * ```
 */
const colors = {
  // Base colors
  /** @type {string} Pure white color */
  white: "#ffffff",
  /** @type {string} Pure black color */
  black: "#141414",

  // Gray scale palette
  /** @type {string} Lightest gray - for backgrounds */
  gray50: "#fafafa",
  /** @type {string} Very light gray - for subtle backgrounds */
  gray100: "#f9f9f9",
  /** @type {string} Very light gray - for subtle backgrounds */
  gray200: "#f0f0f0",
  /** @type {string} Light gray - for borders */
  gray300: "#dcdcdc",
  /** @type {string} Medium-light gray - for disabled elements */
  gray400: "#bdbdbd",
  /** @type {string} Medium gray - for secondary text */
  gray500: "#9e9e9e",
  /** @type {string} Medium-dark gray - for placeholders */
  gray600: "#757575",
  /** @type {string} Dark gray - for body text */
  gray700: "#616161",
  /** @type {string} Darker gray - for emphasis */
  gray800: "#424242",
  /** @type {string} Darkest gray - almost black */
  gray900: "#222222",

  // Brand colors (Renace orange theme)
  /** @type {string} Main brand color - vibrant orange */
  primary: "#FF7600",
  /** @type {string} Light brand color - for hover states and soft accents */
  primaryLight: "#FFA040",
  /** @type {string} Dark brand color - for strong CTAs and dark backgrounds */
  primaryDark: "#E65100",

  // Secondary colors (warm yellow complement)
  /** @type {string} Secondary brand color - vibrant yellow/orange */
  secondary: "#FFD600",
  /** @type {string} Light secondary color - for backgrounds */
  secondaryLight: "#FFF59D",
  /** @type {string} Dark secondary color - for emphasis */
  secondaryDark: "#C7A500",

  // Semantic colors (success, error, warning, info)
  /** @type {string} Success color - green for positive actions */
  success: "#2e7d32",
  /** @type {string} Error color - red for errors and warnings */
  error: "#d32f2f",
  /** @type {string} Warning color - light orange for alerts */
  warning: "#FFA726",
  /** @type {string} Info color - blue for informational content */
  info: "#0288d1",

  // Utility colors
  /** @type {string} Discount color - red for sales and promotions */
  discount: "#FF5252",
  /** @type {string} Highlight color - warm background for emphasis */
  highlight: "#FFF3E0",

  // Layout utility colors
  /** @type {string} Semi-transparent overlay for modals */
  overlay: "rgba(0,0,0,0.4)",
  /** @type {string} Shadow color for elevation effects */
  shadow: "#000000",
  /** @type {string} Primary text color for titles and important text */
  textPrimary: "#222222",
};

export default colors;
