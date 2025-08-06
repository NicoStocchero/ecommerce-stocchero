/**
 * @fileoverview Modern product card component with consistent design.
 * Displays product information in a clean, attractive format.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import Card from "./Card";
import colors from "../../global/colors";

/**
 * ProductCard component props
 * @typedef {Object} ProductCardProps
 * @property {Object} product - Product data object
 * @property {function} onPress - Callback when card is pressed
 * @property {string} [variant="default"] - Card variant (default, compact, featured)
 * @property {boolean} [showBadge=false] - Whether to show stock badge
 */

/**
 * Modern product card component with consistent design
 * @param {ProductCardProps} props - Component props
 * @returns {React.JSX.Element} Rendered product card
 */
const ProductCard = ({
  product,
  onPress,
  variant = "default",
  showBadge = false,
}) => {
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock <= 5 && product.stock > 0;

  return (
    <Card variant={variant} onPress={onPress} elevated>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={product.mainImage}
            style={styles.image}
            contentFit="cover"
            transition={300}
            cachePolicy="memory-disk"
          />
          {showBadge && (
            <View style={styles.badgeContainer}>
              {isOutOfStock && (
                <View style={[styles.badge, styles.outOfStockBadge]}>
                  <Text style={styles.badgeText}>Sin Stock</Text>
                </View>
              )}
              {isLowStock && (
                <View style={[styles.badge, styles.lowStockBadge]}>
                  <Text style={styles.badgeText}>Últimas {product.stock}</Text>
                </View>
              )}
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>

          <View style={styles.details}>
            <Text style={styles.price}>${product.price.toLocaleString()}</Text>
            <Text style={styles.category}>{product.category}</Text>
          </View>

          {variant === "featured" && (
            <Text style={styles.description} numberOfLines={2}>
              {product.description}
            </Text>
          )}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 4,
    backgroundColor: colors.gray100,
  },
  badgeContainer: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 0,
  },
  outOfStockBadge: {
    backgroundColor: colors.error,
  },
  lowStockBadge: {
    backgroundColor: colors.warning,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontFamily: "Inter_18pt-Bold",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  content: {
    flex: 1,
    gap: 12,
  },
  title: {
    fontFamily: "Inter_18pt-SemiBold",
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontFamily: "Inter_18pt-Bold",
    fontSize: 18,
    color: colors.primary,
    letterSpacing: 0.3,
  },
  category: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 12,
    color: colors.gray600,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  description: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 14,
    color: colors.gray600,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
});

export default ProductCard;
