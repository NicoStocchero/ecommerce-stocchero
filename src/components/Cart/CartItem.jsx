/**
 * @fileoverview Cart item component for displaying individual cart items.
 * Uses the modern CartItemCard component with clean, consistent design.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { CartItemCard } from "../UI";

/**
 * CartItem component props
 * @typedef {Object} CartItemProps
 * @property {Object} item - Cart item data
 * @property {function} onPress - Callback when item is pressed (navigation)
 * @property {function} onRemove - Callback when remove button is pressed
 */

/**
 * Cart item component using modern CartItemCard design
 * @param {CartItemProps} props - Component props
 * @returns {React.JSX.Element} Rendered cart item
 */
const CartItem = ({ item, onPress, onRemove }) => {
  return <CartItemCard item={item} onPress={onPress} onRemove={onRemove} />;
};

export default CartItem;
