/**
 * @fileoverview Cart components module exports.
 * Provides reusable components for cart screens and shopping functionality.
 * @author Stocchero
 * @version 1.0.0
 */

/**
 * @module CartComponents
 * @description Collection of reusable cart UI components
 *
 * @example
 * ```javascript
 * import { CartItem, CartSummary, CartEmpty } from '../components/Cart';
 *
 * // Use in cart screens
 * <CartItem item={item} onPress={handlePress} onRemove={handleRemove} />
 * <CartSummary totalPrice={1500} totalQuantity={3} onClearCart={handleClear} />
 * <CartEmpty />
 * ```
 */

export { default as CartItem } from "./CartItem";
export { default as CartSummary } from "./CartSummary";
export { default as CartEmpty } from "./CartEmpty";
