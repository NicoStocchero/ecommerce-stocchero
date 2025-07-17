/**
 * @fileoverview Shopping cart Redux slice using Redux Toolkit.
 * Manages cart state including items, quantities, and total calculations.
 * @author Stocchero
 * @version 1.0.0
 */

import { createSlice } from "@reduxjs/toolkit";

/**
 * Cart item interface
 * @typedef {Object} CartItem
 * @property {string} id - Unique product identifier
 * @property {string} title - Product name
 * @property {number} price - Product price per unit
 * @property {number} quantity - Quantity of this item in cart
 * @property {number} stock - Available stock for this product
 * @property {string} [imageUri] - Product image URL
 * @property {string} [description] - Product description
 */

/**
 * Cart state interface
 * @typedef {Object} CartState
 * @property {string} user - Current user identifier
 * @property {string} updatedAt - ISO timestamp of last cart update
 * @property {CartItem[]} items - Array of items in the cart
 * @property {number} totalQuantity - Total number of items in cart
 * @property {number} totalPrice - Total price of all items in cart
 */

/**
 * Redux slice for shopping cart state management.
 * Handles adding, removing, updating items with automatic total calculations.
 * Includes stock validation to prevent overselling.
 *
 * @example
 * ```javascript
 * import { addItemToCart, removeItemFromCart, updateItemQuantity } from './cartSlice';
 *
 * // Add item to cart
 * dispatch(addItemToCart({ id: '1', title: 'Product', price: 100, quantity: 2 }));
 *
 * // Update item quantity
 * dispatch(updateItemQuantity({ itemId: '1', newQuantity: 3 }));
 *
 * // Remove item from cart
 * dispatch(removeItemFromCart('1'));
 * ```
 */
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    user: "Demo User",
    updatedAt: new Date().toISOString(),
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    /**
     * Adds an item to the cart or increases quantity if item already exists.
     * Validates stock availability before adding.
     *
     * @param {CartState} state - Current cart state
     * @param {Object} action - Redux action object
     * @param {CartItem} action.payload - Item to add to cart
     * @param {number} [action.payload.quantity=1] - Quantity to add
     */
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const qtyToAdd = newItem.quantity || 1;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      // Validar si hay stock suficiente
      const currentQuantityInCart = existingItem ? existingItem.quantity : 0;
      const totalAfterAdd = currentQuantityInCart + qtyToAdd;

      if (totalAfterAdd > newItem.stock) {
        return;
      }

      if (existingItem) {
        existingItem.quantity += qtyToAdd;
      } else {
        state.items.push({ ...newItem, quantity: qtyToAdd });
      }

      // eslint-disable-next-line no-param-reassign
      state.totalQuantity += qtyToAdd;
      // eslint-disable-next-line no-param-reassign
      state.totalPrice += newItem.price * qtyToAdd;
      // eslint-disable-next-line no-param-reassign
      state.updatedAt = new Date().toISOString();
    },
    /**
     * Removes an item completely from the cart.
     * Updates totals and timestamp automatically.
     *
     * @param {CartState} state - Current cart state
     * @param {Object} action - Redux action object
     * @param {string} action.payload - Item ID to remove from cart
     */
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);
      if (existingItem) {
        // eslint-disable-next-line no-param-reassign
        state.items = state.items.filter((item) => item.id !== itemId);
        // eslint-disable-next-line no-param-reassign
        state.totalQuantity -= existingItem.quantity;
        // eslint-disable-next-line no-param-reassign
        state.totalPrice -= existingItem.price * existingItem.quantity;
        // eslint-disable-next-line no-param-reassign
        state.updatedAt = new Date().toISOString();
      }
    },
    /**
     * Clears all items from the cart.
     * Resets totals to zero and updates timestamp.
     *
     * @param {CartState} state - Current cart state
     */
    clearCart: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.items = [];
      // eslint-disable-next-line no-param-reassign
      state.updatedAt = new Date().toISOString();
      // eslint-disable-next-line no-param-reassign
      state.totalQuantity = 0;
      // eslint-disable-next-line no-param-reassign
      state.totalPrice = 0;
    },
    /**
     * Updates the quantity of an existing item in the cart.
     * Recalculates totals based on quantity difference.
     *
     * @param {CartState} state - Current cart state
     * @param {Object} action - Redux action object
     * @param {Object} action.payload - Update payload
     * @param {string} action.payload.itemId - ID of item to update
     * @param {number} action.payload.newQuantity - New quantity for the item
     */
    updateItemQuantity: (state, action) => {
      const { itemId, newQuantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);
      if (existingItem) {
        const diff = newQuantity - existingItem.quantity;
        // eslint-disable-next-line no-param-reassign
        state.totalQuantity += diff;
        // eslint-disable-next-line no-param-reassign
        state.totalPrice += diff * existingItem.price;
        // eslint-disable-next-line no-param-reassign
        existingItem.quantity = newQuantity;
        // eslint-disable-next-line no-param-reassign
        state.updatedAt = new Date().toISOString();
      }
    },
  },
});

// Export action creators
export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  updateItemQuantity,
} = cartSlice.actions;

// Export reducer for store configuration
export default cartSlice.reducer;
