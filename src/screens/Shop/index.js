/**
 * @fileoverview Shop screens module exports.
 * Centralizes exports for all shop-related screen components.
 * @author Stocchero
 * @version 1.0.0
 */

/**
 * @module ShopScreens
 * @description Collection of shop-related screen components for e-commerce functionality
 *
 * @example
 * ```javascript
 * import { Categories, Products, ProductDetail } from './screens/Shop';
 *
 * // Use in ShopStack navigator
 * <Stack.Screen name="Categories" component={Categories} />
 * <Stack.Screen name="Products" component={Products} />
 * <Stack.Screen name="ProductDetail" component={ProductDetail} />
 * ```
 */

export { default as Categories } from "./Categories";
export { default as Products } from "./Products";
export { default as ProductDetail } from "./ProductDetail";
export { default as Cart } from "../Cart/Cart";
export { default as Login } from "../Auth/Login";
export { default as Register } from "../Auth/SignUp";
