import { createSlice } from "@reduxjs/toolkit";

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

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  updateItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
