/**
 * @fileoverview Visual divider component for authentication forms.
 * Creates a horizontal line with centered text, commonly used to separate login options.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../global/colors";

/**
 * Visual divider component for authentication forms.
 * Displays horizontal lines with centered text, typically used to separate
 * different authentication methods (e.g., "o" between email login and social login).
 *
 * @component
 * @returns {React.JSX.Element} Rendered divider component
 *
 * @example
 * ```javascript
 * // Use between login form and social login buttons
 * <FormInput ... />
 * <AuthButton title="Iniciar Sesión" ... />
 * <AuthDivider />
 * <SocialLoginButton ... />
 * ```
 */
const AuthDivider = () => (
  <View style={styles.divider}>
    <View style={styles.line} />
    <Text style={styles.text}>o</Text>
    <View style={styles.line} />
  </View>
);

const styles = StyleSheet.create({
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  line: { flex: 1, height: 1, backgroundColor: colors.gray },
  text: {
    marginHorizontal: 10,
    fontFamily: "Inter_18pt-Regular",
    color: colors.gray,
    fontSize: 16,
  },
});

export default AuthDivider;
