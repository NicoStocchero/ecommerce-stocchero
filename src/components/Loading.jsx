/**
 * @fileoverview Loading component with activity indicator and customizable text.
 * Provides consistent loading states with optional text and sizing options.
 * @author Stocchero
 * @version 1.0.0
 */

import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import colors from "../global/colors";

/**
 * Loading component props
 * @typedef {Object} LoadingProps
 * @property {string} [text="Cargando..."] - Loading text to display below spinner
 * @property {string} [size="large"] - Size of the activity indicator ("small" | "large")
 * @property {boolean} [fullScreen=true] - Whether to use full screen layout or inline
 */

/**
 * Loading component with activity indicator and customizable text.
 * Provides consistent loading states throughout the application with flexible sizing and layout options.
 * Can be used as full-screen loader or inline component.
 *
 * @component
 * @param {LoadingProps} props - Component props
 * @returns {React.JSX.Element} Rendered loading component with spinner and text
 *
 * @example
 * ```javascript
 * // Full screen loading
 * <Loading text="Cargando productos..." />
 *
 * // Inline loading with small spinner
 * <Loading
 *   text="Guardando..."
 *   size="small"
 *   fullScreen={false}
 * />
 *
 * // Loading without text
 * <Loading text="" size="large" />
 *
 * // Custom loading message
 * <Loading text="Procesando pedido..." />
 * ```
 */
const Loading = ({
  text = "Cargando...",
  size = "large",
  fullScreen = true,
}) => {
  return (
    <View style={fullScreen ? styles.fullScreen : styles.inline}>
      <ActivityIndicator size={size} color={colors.primary} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inline: {
    paddingVertical: 12,
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: colors.gray,
  },
});
