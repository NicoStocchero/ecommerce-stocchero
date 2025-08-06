/**
 * @fileoverview Profile menu card component for displaying menu items.
 * Provides consistent card styling for profile menu sections.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../global/colors";

/**
 * ProfileMenuCard component props
 * @typedef {Object} ProfileMenuCardProps
 * @property {React.ReactNode} children - Menu items to display
 * @property {Object} [style] - Additional style object to merge with default styles
 */

/**
 * Profile menu card component for displaying menu items.
 * Provides consistent card styling for profile menu sections.
 *
 * @component
 * @param {ProfileMenuCardProps} props - Component props
 * @returns {React.JSX.Element} Rendered profile menu card
 *
 * @example
 * ```javascript
 * <ProfileMenuCard>
 *   <ProfileMenuItem title="Editar Perfil" onPress={handleEdit} />
 *   <View style={styles.divider} />
 *   <ProfileMenuItem title="Cambiar Contraseña" onPress={handlePassword} />
 * </ProfileMenuCard>
 * ```
 */
const ProfileMenuCard = ({ children, style }) => (
  <View style={[styles.menuCard, style]}>{children}</View>
);

const styles = StyleSheet.create({
  menuCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.gray100,
    overflow: "hidden",
  },
});

export default ProfileMenuCard;
