/**
 * @fileoverview Profile menu item component for navigation and actions.
 * Provides consistent styling for profile menu items with optional destructive styling.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import colors from "../../global/colors";

/**
 * ProfileMenuItem component props
 * @typedef {Object} ProfileMenuItemProps
 * @property {string} title - Menu item title
 * @property {string} [subtitle] - Menu item subtitle (optional)
 * @property {function} onPress - Press handler function
 * @property {boolean} [isDestructive=false] - Whether item has destructive styling
 */

/**
 * Profile menu item component for navigation and actions.
 * Provides consistent styling for profile menu items with optional destructive styling.
 *
 * @component
 * @param {ProfileMenuItemProps} props - Component props
 * @returns {React.JSX.Element} Rendered profile menu item
 *
 * @example
 * ```javascript
 * <ProfileMenuItem
 *   title="Editar Perfil"
 *   subtitle="Modificar información personal"
 *   onPress={handleEditProfile}
 * />
 *
 * <ProfileMenuItem
 *   title="Cerrar Sesión"
 *   subtitle="Salir de tu cuenta"
 *   onPress={handleLogout}
 *   isDestructive={true}
 * />
 * ```
 */
const ProfileMenuItem = ({
  title,
  subtitle,
  onPress,
  isDestructive = false,
}) => (
  <Pressable
    onPress={onPress}
    style={styles.menuItem}
    accessibilityRole="button"
    accessibilityLabel={title}
    accessibilityHint={subtitle}
  >
    <View style={styles.menuItemContent}>
      <Text
        style={[styles.menuItemTitle, isDestructive && styles.destructiveText]}
      >
        {title}
      </Text>
      {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
    </View>
    <Text
      style={[styles.menuItemArrow, isDestructive && styles.destructiveArrow]}
    >
      ›
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  menuItemContent: {
    flex: 1,
    gap: 4,
  },
  menuItemTitle: {
    fontFamily: "Inter_18pt-SemiBold",
    fontSize: 16,
    color: colors.textPrimary,
    letterSpacing: 0.2,
  },
  menuItemSubtitle: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 14,
    color: colors.gray600,
    letterSpacing: 0.2,
  },
  menuItemArrow: {
    fontFamily: "Inter_18pt-Bold",
    fontSize: 18,
    color: colors.gray400,
  },
  destructiveText: {
    color: colors.error,
  },
  destructiveArrow: {
    color: colors.error,
  },
});

export default ProfileMenuItem;
