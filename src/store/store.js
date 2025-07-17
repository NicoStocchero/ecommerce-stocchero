import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import shopReducer from "../features/shop/shopSlice";
import authReducer from "../features/auth/authSlice";
import { authApi } from "../services/auth/authApi";
import { shopApi } from "../services/shop/shopApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    shop: shopReducer,
    auth: authReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, shopApi.middleware),
  // Enable Redux DevTools
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
