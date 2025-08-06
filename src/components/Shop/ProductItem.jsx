/**
 * @fileoverview Product item component for displaying individual products in lists.
 * Uses the modern ProductCard component with Nike-inspired design.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { ProductCard } from "../UI";

/**
 * ProductItem component props
 * @typedef {Object} ProductItemProps
 * @property {Object} item - Product data object
 * @property {function} onPress - Callback when item is pressed
 */

/**
 * Product item component using modern ProductCard design
 * @param {ProductItemProps} props - Component props
 * @returns {React.JSX.Element} Rendered product item
 */
const ProductItem = ({ item, onPress }) => {
  return (
    <ProductCard
      product={item}
      onPress={onPress}
      variant="compact"
      showBadge={true}
    />
  );
};

export default ProductItem;
