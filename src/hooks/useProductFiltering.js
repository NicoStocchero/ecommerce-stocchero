/**
 * @fileoverview Custom hook for product filtering logic.
 * Handles search functionality and product filtering by keyword.
 * @author Stocchero
 * @version 1.0.0
 */

import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

/**
 * Custom hook for product filtering logic.
 * Handles search functionality and product filtering by keyword.
 *
 * @param {Array} products - Array of products to filter
 * @returns {Object} Filtering state and functions
 * @returns {string} returns.keyword - Current search keyword
 * @returns {function} returns.setKeyword - Function to update search keyword
 * @returns {Array} returns.filteredProducts - Filtered products array
 * @returns {string} returns.normalizedKeyword - Normalized search keyword
 *
 * @example
 * ```javascript
 * const { keyword, setKeyword, filteredProducts } = useProductFiltering(products);
 * ```
 */
export const useProductFiltering = (products) => {
  const [keyword, setKeyword] = useState("");

  // Normalize search keyword for filtering
  const normalizedKeyword = keyword.trim().toLowerCase();

  // Filter products based on search keyword
  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(normalizedKeyword)
  );

  /**
   * Reset search keyword when screen comes into focus
   * Provides clean state when navigating back to this screen
   */
  useFocusEffect(
    useCallback(() => {
      return () => {
        setKeyword("");
      };
    }, [])
  );

  return {
    keyword,
    setKeyword,
    filteredProducts,
    normalizedKeyword,
  };
};
