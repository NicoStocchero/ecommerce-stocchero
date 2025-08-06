/**
 * @fileoverview Modern SQLite hook using expo-sqlite.
 * Provides easy access to database operations and session management.
 * @author Stocchero
 * @version 1.0.0
 */

import { useSQLiteContext } from "expo-sqlite";
import { useCallback } from "react";
import {
  saveUserSession,
  getUserSession,
  clearUserSession,
  hasActiveSession,
} from "../services/sqlite/sessionService";
import {
  saveCartItem,
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
  getCartItemById,
  replaceCart,
} from "../services/sqlite/cartService";

/**
 * Modern SQLite hook using expo-sqlite context
 * @returns {Object} Object containing all SQLite operations
 */
export const useSQLite = () => {
  const db = useSQLiteContext();

  // Session operations
  const saveSession = useCallback(
    async (userData) => {
      return await saveUserSession(db, userData);
    },
    [db]
  );

  const getSession = useCallback(async () => {
    return await getUserSession(db);
  }, [db]);

  const clearSession = useCallback(async () => {
    return await clearUserSession(db);
  }, [db]);

  const checkActiveSession = useCallback(async () => {
    return await hasActiveSession(db);
  }, [db]);

  // Cart operations
  const saveCartItemToDB = useCallback(
    async (item) => {
      return await saveCartItem(db, item);
    },
    [db]
  );

  const getCartItemsFromDB = useCallback(async () => {
    return await getCartItems(db);
  }, [db]);

  const updateCartItemQuantityInDB = useCallback(
    async (productId, quantity) => {
      return await updateCartItemQuantity(db, productId, quantity);
    },
    [db]
  );

  const removeCartItemFromDB = useCallback(
    async (productId) => {
      return await removeCartItem(db, productId);
    },
    [db]
  );

  const clearCartFromDB = useCallback(async () => {
    return await clearCart(db);
  }, [db]);

  const getCartItemByIdFromDB = useCallback(
    async (productId) => {
      return await getCartItemById(db, productId);
    },
    [db]
  );

  const replaceCartInDB = useCallback(
    async (items) => {
      return await replaceCart(db, items);
    },
    [db]
  );

  return {
    // Session methods
    saveSession,
    getSession,
    clearSession,
    checkActiveSession,

    // Cart methods
    saveCartItem: saveCartItemToDB,
    getCartItems: getCartItemsFromDB,
    updateCartItemQuantity: updateCartItemQuantityInDB,
    removeCartItem: removeCartItemFromDB,
    clearCart: clearCartFromDB,
    getCartItemById: getCartItemByIdFromDB,
    replaceCart: replaceCartInDB,

    // Direct database access
    db,
  };
};
