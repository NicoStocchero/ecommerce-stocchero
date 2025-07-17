/**
 * @fileoverview Reusable card wrapper component with consistent styling.
 * Provides a white background container with rounded corners and padding.
 * @author Stocchero
 * @version 1.0.0
 */

import { StyleSheet, View } from "react-native";
import colors from "../global/colors";

/**
 * FlatCard component props
 * @typedef {Object} FlatCardProps
 * @property {React.ReactNode} children - Child components to render inside the card
 * @property {Object} [style] - Additional style object to merge with default styles
 */

/**
 * Reusable card wrapper component with consistent styling.
 * Provides a white background container with rounded corners, padding, and consistent spacing.
 * Can be extended with additional styles while maintaining base card appearance.
 *
 * @component
 * @param {FlatCardProps} props - Component props
 * @returns {React.JSX.Element} Rendered card container with children
 *
 * @example
 * ```javascript
 * // Basic card usage
 * <FlatCard>
 *   <Text>Card content</Text>
 * </FlatCard>
 *
 * // Card with custom styling
 * <FlatCard style={{ margin: 16, elevation: 4 }}>
 *   <Text>Enhanced card with shadow</Text>
 * </FlatCard>
 *
 * // Product card example
 * <FlatCard style={styles.productCard}>
 *   <Image source={product.image} />
 *   <Text>{product.title}</Text>
 * </FlatCard>
 * ```
 */
const FlatCard = ({ children, style }) => (
  <View style={{ ...styles.container, ...style }}>{children}</View>
);

export default FlatCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
  },
});
