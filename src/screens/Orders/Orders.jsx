/**
 * @fileoverview Orders screen component for displaying user order history.
 * Shows empty state with placeholder for future order management functionality.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../global/colors";

/**
 * Orders screen component for displaying user order history and management.
 * Currently shows empty state with plans for future order tracking functionality.
 *
 * Future Features (to be implemented):
 * - Order history list with order details
 * - Order status tracking (pending, shipped, delivered)
 * - Order search and filtering
 * - Individual order detail view
 * - Re-order functionality
 * - Order cancellation for eligible orders
 * - Integration with backend order management system
 *
 * @component
 * @returns {React.JSX.Element} Rendered orders screen with empty state
 *
 * @example
 * ```javascript
 * // Used in OrderStack navigator
 * <Stack.Screen
 *   name="Orders"
 *   component={Orders}
 *   options={{ headerTitle: "Pedidos" }}
 * />
 *
 * // Accessed via TabNavigator "Pedidos" tab
 * ```
 */
const Orders = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Mis Pedidos</Text>
    <Text style={styles.emptyText}>No tienes pedidos realizados</Text>
  </View>
);

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: colors.textPrimary || "#1a1a1a",
    marginBottom: 16,
  },
  emptyText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: colors.gray500 || "#999",
    textAlign: "center",
  },
});
