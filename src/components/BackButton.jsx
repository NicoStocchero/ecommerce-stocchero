/**
 * @fileoverview Back navigation button component with platform-specific icons.
 * Provides consistent back navigation with iOS and Android appropriate icons.
 * @author Stocchero
 * @version 1.0.0
 */

import { Pressable, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../global/colors";

/**
 * Back navigation button component with platform-specific styling.
 * Automatically detects platform and uses appropriate back icon (chevron for iOS, arrow for Android).
 * Uses React Navigation's goBack() method for navigation.
 *
 * @component
 * @returns {React.JSX.Element} Rendered back button with icon and text
 *
 * @example
 * ```javascript
 * // Basic usage in screen header
 * const ProductDetailScreen = () => {
 *   return (
 *     <View>
 *       <BackButton />
 *       <Text>Product Details</Text>
 *     </View>
 *   );
 * };
 *
 * // Used in custom header
 * <View style={styles.header}>
 *   <BackButton />
 *   <Text style={styles.title}>Product Detail</Text>
 * </View>
 * ```
 */
const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.goBack()} style={styles.button}>
      <Ionicons
        name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
        size={24}
        color={colors.white}
      />
      <Text style={styles.text}>Back</Text>
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    margin: 12,
    alignSelf: "flex-start",
  },
  text: {
    color: colors.white,
    fontWeight: "600",
  },
});
