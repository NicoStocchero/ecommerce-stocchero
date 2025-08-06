/**
 * @fileoverview Cart empty component for displaying empty cart state.
 * Uses the modern EmptyState component with clean, consistent design.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { EmptyState } from "../UI";

/**
 * CartEmpty component props
 * @typedef {Object} CartEmptyProps
 * @property {string} [title="Tu carrito está vacío"] - Empty cart title
 * @property {string} [message="Agrega productos para comenzar tu compra"] - Empty cart message
 */

/**
 * Cart empty component using modern EmptyState design
 * @param {CartEmptyProps} props - Component props
 * @returns {React.JSX.Element} Rendered empty cart state
 */
const CartEmpty = ({
  title = "Tu carrito está vacío",
  message = "Agrega productos para comenzar tu compra",
}) => {
  return (
    <EmptyState
      title={title}
      message={message}
      icon="cart-outline"
      variant="cart"
    />
  );
};

export default CartEmpty;
