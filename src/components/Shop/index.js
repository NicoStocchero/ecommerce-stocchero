/**
 * @fileoverview Shop components module exports.
 * Provides reusable components for shop screens and product management.
 * @author Stocchero
 * @version 1.0.0
 */

/**
 * @module ShopComponents
 * @description Collection of reusable shop UI components
 *
 * @example
 * ```javascript
 * import { ProductItem, ProductsEmpty } from '../components/Shop';
 *
 * // Use in shop screens
 * <ProductItem item={product} onPress={handlePress} />
 * <ProductsEmpty keyword={searchKeyword} />
 * ```
 */

export { default as ProductItem } from "./ProductItem";
export { default as ProductsEmpty } from "./ProductsEmpty";
