/**
 * @fileoverview Cart summary component for displaying totals and action buttons.
 * Uses modern design with clean, consistent styling.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { SummaryCard, Button } from "../UI";
import { useCreateOrderMutation } from "../../services";
import { withErrorHandling } from "../../utils/errorHandler";
import { useSQLite, useAuthToken } from "../../hooks";

/**
 * CartSummary component props
 * @typedef {Object} CartSummaryProps
 * @property {number} totalPrice - Total cart price
 * @property {number} totalQuantity - Total number of items
 * @property {function} onClearCart - Callback when clear cart button is pressed
 * @property {Array} cartItems - Array of cart items for order creation
 */

/**
 * Cart summary component with integrated checkout functionality
 * @param {CartSummaryProps} props - Component props
 * @returns {React.JSX.Element} Rendered cart summary
 */
const CartSummary = ({ totalPrice, totalQuantity, onClearCart, cartItems }) => {
  const { session, freshToken } = useAuthToken();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  /**
   * Format price for display
   */
  const formatPrice = (price) => {
    return price.toLocaleString();
  };

  /**
   * Handle checkout process - creates order in Firebase
   */
  const handleCheckout = async () => {
    try {
      if (!session?.local_id || !freshToken) {
        Alert.alert("Error", "Debes estar logueado para realizar una compra");
        return;
      }

      if (!cartItems || cartItems.length === 0) {
        Alert.alert("Error", "El carrito está vacío");
        return;
      }

      const order = {
        items: cartItems,
        total: totalPrice,
        quantity: totalQuantity,
        createdAt: new Date().toISOString(),
        status: "pending",
      };

      await createOrder({
        userId: session.local_id,
        order,
        token: freshToken,
      }).unwrap();

      Alert.alert(
        "¡Compra exitosa!",
        "Tu pedido ha sido registrado correctamente",
        [{ text: "OK", onPress: () => onClearCart() }]
      );
    } catch (error) {
      // Handle authentication errors specifically
      if (error?.message?.includes("sesión ha expirado")) {
        Alert.alert(
          "Error de Autenticación",
          "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
          [
            {
              text: "OK",
              onPress: () => {
                // Navigate to login - you might need to pass navigation prop
                // navigation.navigate("Login");
              },
            },
          ]
        );
        return;
      }

      // Handle other errors
      Alert.alert(
        "Error en la compra",
        error.message || "No se pudo completar la compra. Intenta nuevamente."
      );
    }
  };

  const summaryRows = [{ label: "Productos", value: totalQuantity }];

  const totalRow = {
    label: "Total",
    value: `$${formatPrice(totalPrice)}`,
  };

  return (
    <View style={styles.container}>
      <SummaryCard rows={summaryRows} totalRow={totalRow} />

      <View style={styles.buttonContainer}>
        <Button
          title="Finalizar Compra"
          variant="primary"
          size="large"
          onPress={handleCheckout}
          disabled={totalQuantity === 0 || isLoading}
        />

        <Button
          title="Vaciar Carrito"
          variant="outline"
          size="medium"
          onPress={onClearCart}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  buttonContainer: {
    gap: 16,
  },
});

export default CartSummary;
