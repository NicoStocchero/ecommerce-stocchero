/**
 * @fileoverview Modern store card component with consistent design.
 * Displays store information in a consistent, attractive format.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "./Card";
import colors from "../../global/colors";

/**
 * StoreCard component props
 * @typedef {Object} StoreCardProps
 * @property {Object} store - Store data object
 * @property {function} onPress - Callback when card is pressed
 * @property {string} [variant="default"] - Card variant (default, compact, featured)
 * @property {boolean} [selected=false] - Whether the store is selected
 * @property {function} [formatServices] - Function to format services array
 */

/**
 * Modern store card component with consistent design
 * @param {StoreCardProps} props - Component props
 * @returns {React.JSX.Element} Rendered store card
 */
const StoreCard = ({
  store,
  onPress,
  variant = "default",
  selected = false,
  formatServices,
}) => {
  return (
    <Card
      variant={variant}
      onPress={onPress}
      elevated={selected}
      style={selected && styles.selectedCard}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.storeName} numberOfLines={1}>
            {store.title || "Tienda"}
          </Text>
          <Ionicons
            name="chevron-forward"
            size={16}
            color={selected ? colors.primary : colors.gray400}
          />
        </View>

        <Text style={styles.storeAddress} numberOfLines={2}>
          {store.address || "Dirección no disponible"}
        </Text>

        <Text style={styles.storeHours} numberOfLines={1}>
          {store.hours || "Horarios no disponibles"}
        </Text>

        {variant === "featured" && (
          <>
            {store.phone && (
              <Text style={styles.storePhone}>{store.phone}</Text>
            )}

            {store.services && formatServices && (
              <Text style={styles.storeServices} numberOfLines={1}>
                {formatServices(store.services)}
              </Text>
            )}

            {store.description && (
              <Text style={styles.storeDescription} numberOfLines={2}>
                {store.description}
              </Text>
            )}

            {!store.phone && !store.services && !store.description && (
              <Text style={styles.storeDescription} numberOfLines={2}>
                Información adicional disponible en la tienda
              </Text>
            )}
          </>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    minHeight: 80,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  storeName: {
    fontFamily: "Inter_18pt-SemiBold",
    fontSize: 16,
    color: colors.textPrimary,
    flex: 1,
    marginRight: 12,
    letterSpacing: 0.2,
  },
  storeAddress: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 14,
    color: colors.gray600,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  storeHours: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 12,
    color: colors.gray500,
    letterSpacing: 0.3,
  },
  storePhone: {
    fontFamily: "Inter_18pt-SemiBold",
    fontSize: 14,
    color: colors.primary,
    letterSpacing: 0.3,
  },
  storeServices: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 12,
    color: colors.gray500,
    letterSpacing: 0.3,
  },
  storeDescription: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 13,
    color: colors.gray600,
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  selectedCard: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
});

export default StoreCard;
