/**
 * @fileoverview Quantity counter component for product selection.
 * Provides increment/decrement buttons with stock validation and user feedback.
 * @author Stocchero
 * @version 1.0.0
 */

import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import colors from "../global/colors";

/**
 * ButtonCount component props
 * @typedef {Object} ButtonCountProps
 * @property {function} [onQuantityChange] - Callback function called when quantity changes
 * @property {number} [initial=1] - Initial quantity value
 * @property {number} [stock=10] - Maximum available stock for validation
 */

/**
 * Quantity counter component with increment/decrement buttons.
 * Validates against available stock and provides user feedback for invalid operations.
 * Maintains internal state and notifies parent component of quantity changes.
 *
 * @component
 * @param {ButtonCountProps} props - Component props
 * @returns {React.JSX.Element} Rendered quantity counter with buttons
 *
 * @example
 * ```javascript
 * // Basic usage
 * <ButtonCount
 *   onQuantityChange={(newQuantity) => setQuantity(newQuantity)}
 *   initial={1}
 *   stock={15}
 * />
 *
 * // With product stock validation
 * <ButtonCount
 *   onQuantityChange={handleQuantityChange}
 *   initial={1}
 *   stock={product.stock}
 * />
 * ```
 */
const ButtonCount = ({ onQuantityChange, initial = 1, stock = 10 }) => {
  const [count, setCount] = useState(initial);

  /**
   * Handles increment button press.
   * Validates against available stock before incrementing.
   */
  const handleIncrement = () => {
    if (count + 1 > stock) {
      Alert.alert("Stock insuficiente", "No hay más stock disponible.");
      return;
    }
    const newCount = count + 1;
    setCount(newCount);
    if (onQuantityChange) onQuantityChange(newCount);
  };

  /**
   * Handles decrement button press.
   * Prevents quantity from going below 1.
   */
  const handleDecrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      if (onQuantityChange) onQuantityChange(newCount);
    } else {
      Alert.alert("Cantidad mínima", "Debe ser al menos 1 unidad.");
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleDecrement}>
        <Text style={styles.buttonText}>–</Text>
      </Pressable>

      <Text style={styles.count}>{count}</Text>

      <Pressable style={styles.button} onPress={handleIncrement}>
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
};

export default ButtonCount;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    justifyContent: "center",
    marginTop: 16,
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
  },
  count: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    minWidth: 24,
    textAlign: "center",
    color: colors.black,
  },
});
