/**
 * @fileoverview Modern order card component with consistent design.
 * Displays order information in a clean, attractive format.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "./Card";
import colors from "../../global/colors";

/**
 * OrderCard component props
 * @typedef {Object} OrderCardProps
 * @property {Object} order - Order data object
 * @property {function} onPress - Callback when card is pressed
 * @property {string} [variant="default"] - Card variant (default, compact, featured)
 */

/**
 * Modern order card component with consistent design
 * @param {OrderCardProps} props - Component props
 * @returns {React.JSX.Element} Rendered order card
 */
const OrderCard = ({ order, onPress, variant = "default" }) => {
  const getStatusInfo = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return {
          color: colors.warning,
          icon: "time-outline",
          text: "Pendiente",
        };
      case "processing":
        return {
          color: colors.primary,
          icon: "construct-outline",
          text: "Procesando",
        };
      case "shipped":
        return { color: colors.info, icon: "car-outline", text: "Enviado" };
      case "delivered":
        return {
          color: colors.success,
          icon: "checkmark-circle-outline",
          text: "Entregado",
        };
      case "cancelled":
        return {
          color: colors.error,
          icon: "close-circle-outline",
          text: "Cancelado",
        };
      default:
        return {
          color: colors.gray600,
          icon: "help-circle-outline",
          text: "Desconocido",
        };
    }
  };

  const formatOrderId = (id) => {
    if (!id) return "N/A";

    // Remove any leading/trailing dashes and take first 8 characters
    const cleanId = id.replace(/^-+|-+$/g, "");

    if (cleanId.length >= 8) {
      return cleanId.substring(0, 8).toUpperCase();
    }

    return cleanId.toUpperCase();
  };

  return (
    <Card variant={variant} onPress={onPress} elevated>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.orderNumber}>#{formatOrderId(order.id)}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusInfo(order.status).color },
            ]}
          >
            <Ionicons
              name={getStatusInfo(order.status).icon}
              size={12}
              color={colors.white}
            />
            <Text style={styles.statusText}>
              {getStatusInfo(order.status).text}
            </Text>
          </View>
        </View>

        {/* Product list */}
        <View style={styles.itemsList}>
          {order.items &&
            order.items.slice(0, 2).map((item, index) => (
              <Text key={index} style={styles.itemText} numberOfLines={1}>
                • {item.title} x{item.quantity}
              </Text>
            ))}
          {order.items && order.items.length > 2 && (
            <Text style={styles.moreItems}>
              +{order.items.length - 2} productos más
            </Text>
          )}
        </View>

        <View style={styles.details}>
          <Text style={styles.date}>
            {new Date(order.createdAt).toLocaleDateString("es-ES")}
          </Text>
          <Text style={styles.items}>{order.quantity} productos</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${order.total.toLocaleString()}</Text>
        </View>

        {variant === "featured" && (
          <Text style={styles.description} numberOfLines={2}>
            {order.description}
          </Text>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderNumber: {
    fontFamily: "Inter_18pt-Bold",
    fontSize: 18,
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 0,
    gap: 4,
  },
  statusText: {
    fontFamily: "Inter_18pt-Bold",
    fontSize: 10,
    color: colors.white,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  itemsList: {
    gap: 4,
  },
  itemText: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 13,
    color: colors.textSecondary,
    letterSpacing: 0.2,
  },
  moreItems: {
    fontFamily: "Inter_18pt-Medium",
    fontSize: 12,
    color: colors.gray500,
    letterSpacing: 0.2,
    fontStyle: "italic",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 14,
    color: colors.gray600,
    letterSpacing: 0.2,
  },
  items: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 14,
    color: colors.gray600,
    letterSpacing: 0.2,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
  },
  totalLabel: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 14,
    color: colors.gray600,
    letterSpacing: 0.3,
  },
  totalValue: {
    fontFamily: "Inter_18pt-Bold",
    fontSize: 18,
    color: colors.primary,
    letterSpacing: 0.3,
  },
  description: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 14,
    color: colors.gray600,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
});

export default OrderCard;
