/**
 * @fileoverview Profile version component for displaying app version information.
 * Shows app version and build information at the bottom of the profile screen.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../global/colors";

/**
 * ProfileVersion component props
 * @typedef {Object} ProfileVersionProps
 * @property {string} [version="Tienda Renace v1.0.0"] - App version string
 */

/**
 * Profile version component for displaying app version information.
 * Shows app version and build information at the bottom of the profile screen.
 *
 * @component
 * @param {ProfileVersionProps} props - Component props
 * @returns {React.JSX.Element} Rendered profile version component
 *
 * @example
 * ```javascript
 * <ProfileVersion version="Tienda Renace v1.0.0" />
 * ```
 */
const ProfileVersion = ({ version = "Tienda Renace v1.0.0" }) => (
  <View style={styles.versionContainer}>
    <Text style={styles.versionText}>{version}</Text>
  </View>
);

const styles = StyleSheet.create({
  versionContainer: {
    alignItems: "center",
    marginTop: 32,
    paddingVertical: 16,
  },
  versionText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: colors.gray500,
  },
});

export default ProfileVersion;
