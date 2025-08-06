/**
 * @fileoverview Modern cart item card component with consistent design.
 * Displays cart item information in a clean, attractive format.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../global/colors";

/**
 * CartItemCard component props
 * @typedef {Object} CartItemCardProps
 * @property {Object} item - Cart item data object
 * @property {function} onPress - Callback when card is pressed
 * @property {function} onRemove - Callback when remove button is pressed
 */

/**
 * Modern cart item card component with consistent design
 * @param {CartItemCardProps} props - Component props
 * @returns {React.JSX.Element} Rendered cart item card
 */
const CartItemCard = ({ item, onPress, onRemove }) => {
  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  return (
    <Pressable style={styles.container} onPress={onPress} activeOpacity={0.95}>
      <View style={styles.imageContainer}>
        <Image
          source={item.mainImage}
          style={styles.image}
          contentFit="cover"
          transition={300}
          cachePolicy="memory-disk"
        />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Pressable style={styles.removeButton} onPress={onRemove}>
            <Ionicons name="close" size={18} color={colors.white} />
          </Pressable>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price.toLocaleString()}</Text>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Cantidad</Text>
            <View style={styles.quantityBadge}>
              <Text style={styles.quantityText}>{item.quantity}</Text>
            </View>
          </View>
        </View>

        <View style={styles.subtotalRow}>
          <Text style={styles.subtotalLabel}>Subtotal</Text>
          <Text style={styles.subtotalValue}>
            ${calculateSubtotal(item.price, item.quantity).toLocaleString()}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 0,
    padding: 20,
    flexDirection: "row",
    gap: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  imageContainer: {
    flexShrink: 0,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 4,
    backgroundColor: colors.gray100,
  },
  content: {
    flex: 1,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    flex: 1,
    fontFamily: "Inter_18pt-SemiBold",
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 22,
    marginRight: 16,
    letterSpacing: 0.2,
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.error,
    alignItems: "center",
    justifyContent: "center",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontFamily: "Inter_18pt-Bold",
    fontSize: 18,
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  quantityLabel: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 14,
    color: colors.gray600,
    letterSpacing: 0.3,
  },
  quantityBadge: {
    backgroundColor: colors.gray100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 0,
    minWidth: 48,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  quantityText: {
    fontFamily: "Inter_18pt-Bold",
    fontSize: 14,
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  subtotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subtotalLabel: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 14,
    color: colors.gray600,
    letterSpacing: 0.3,
  },
  subtotalValue: {
    fontFamily: "Inter_18pt-Bold",
    fontSize: 16,
    color: colors.success,
    letterSpacing: 0.3,
  },
});

export default CartItemCard;
