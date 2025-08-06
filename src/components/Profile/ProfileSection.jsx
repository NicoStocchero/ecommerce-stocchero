/**
 * @fileoverview Profile section component for displaying grouped profile content.
 * Provides consistent section styling with title and content area.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../global/colors";

/**
 * ProfileSection component props
 * @typedef {Object} ProfileSectionProps
 * @property {string} title - Section title
 * @property {React.ReactNode} children - Section content
 */

/**
 * Profile section component for displaying grouped profile content.
 * Provides consistent section styling with title and content area.
 *
 * @component
 * @param {ProfileSectionProps} props - Component props
 * @returns {React.JSX.Element} Rendered profile section
 *
 * @example
 * ```javascript
 * <ProfileSection title="Gestión de Cuenta">
 *   <ProfileMenuCard>
 *     <ProfileMenuItem title="Editar Perfil" onPress={handleEdit} />
 *   </ProfileMenuCard>
 * </ProfileSection>
 * ```
 */
const ProfileSection = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: "Inter_18pt-Bold",
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 12,
    letterSpacing: 0.3,
  },
});

export default ProfileSection;
