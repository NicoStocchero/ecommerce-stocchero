import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../features/shop/shopSlice";
import cartReducer from "../features/cart/cartSlice";

const store = configureStore({
  reducer: {
    shop: shopReducer,
    cart: cartReducer,
  },
  // Enable Redux DevTools
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
