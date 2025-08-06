/**
 * @fileoverview Empty products component for displaying when no products are found.
 * Uses the modern EmptyState component with Nike-inspired design.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { EmptyState } from "../UI";

/**
 * ProductsEmpty component props
 * @typedef {Object} ProductsEmptyProps
 * @property {string} [keyword] - Search keyword that yielded no results
 */

/**
 * Empty products component using modern EmptyState design
 * @param {ProductsEmptyProps} props - Component props
 * @returns {React.JSX.Element} Rendered empty state
 */
const ProductsEmpty = ({ keyword }) => {
  const title = keyword
    ? `No se encontraron productos para "${keyword}"`
    : "No hay productos disponibles";

  const message = keyword
    ? "Intenta con otros términos de búsqueda o explora nuestras categorías"
    : "Explora nuestras categorías para encontrar productos increíbles";

  return (
    <EmptyState
      title={title}
      message={message}
      icon="search-outline"
      variant="search"
    />
  );
};

export default ProductsEmpty;
