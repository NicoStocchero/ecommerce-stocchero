/**
 * @fileoverview UI components module exports.
 * Provides modern, reusable UI components with clean, consistent design.
 * @author Stocchero
 * @version 1.0.0
 */

/**
 * @module UIComponents
 * @description Collection of modern UI components with consistent design
 *
 * @example
 * ```javascript
 * import { Card, Button, ProductCard, CartItemCard, EmptyState, OrderCard, StoreCard } from '../components/UI';
 *
 * // Use in screens
 * <Card variant="featured">
 *   <Text>Featured content</Text>
 * </Card>
 *
 * <Button title="Add to Cart" variant="primary" onPress={handleAdd} />
 *
 * <ProductCard product={product} onPress={handlePress} />
 *
 * <CartItemCard item={item} onPress={handlePress} onRemove={handleRemove} />
 *
 * <EmptyState title="No products found" message="Try adjusting your search" />
 *
 * <OrderCard order={order} onPress={handlePress} />
 *
 * <StoreCard store={store} onPress={handlePress} selected={isSelected} />
 * ```
 */

export { default as Card } from "./Card";
export { default as Button } from "./Button";
export { default as ProductCard } from "./ProductCard";
export { default as CartItemCard } from "./CartItemCard";
export { default as EmptyState } from "./EmptyState";
export { default as OrderCard } from "./OrderCard";
export { default as StoreCard } from "./StoreCard";
export { default as SummaryCard } from "./SummaryCard";
