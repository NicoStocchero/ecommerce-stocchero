/**
 * @fileoverview SQLite cart management service for shopping cart persistence.
 * Provides functions to save, retrieve, update, and clear cart items in local SQLite database.
 * @author Stocchero
 * @version 1.0.0
 */

import { withServiceErrorHandling } from "../errorService";

/**
 * Saves a cart item to SQLite database.
 * Stores product information and quantity for persistent cart management.
 *
 * @param {Object} db - SQLite database instance
 * @param {Object} item - Cart item to save
 * @param {string} item.id - Product ID
 * @param {string} item.title - Product title
 * @param {number} item.price - Product price
 * @param {number} item.quantity - Item quantity
 * @param {string} item.image - Product image URL
 * @returns {Promise<void>} Promise that resolves when item is saved
 *
 * @example
 * ```javascript
 * const db = await getDatabase();
 * await saveCartItem(db, {
 *   id: 'product123',
 *   title: 'Gaming Console',
 *   price: 299.99,
 *   quantity: 1,
 *   image: 'https://example.com/image.jpg'
 * });
 * ```
 */
export const saveCartItem = withServiceErrorHandling(
  async (db, item) => {
    const { id, title, price, quantity, image } = item;

    // Check if item already exists
    const existingItem = await db.getFirstAsync(
      "SELECT * FROM cart_items WHERE product_id = ?",
      [id]
    );

    if (existingItem) {
      // Update existing item quantity
      await db.runAsync(
        "UPDATE cart_items SET quantity = quantity + ? WHERE product_id = ?",
        [quantity, id]
      );
    } else {
      // Insert new item
      await db.runAsync(
        `INSERT INTO cart_items (
          product_id, title, price, quantity, image, created_at
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        [id, title, price, quantity, image, new Date().toISOString()]
      );
    }
  },
  "CART",
  "saveItem"
);

/**
 * Retrieves all cart items from SQLite database.
 * Returns array of cart items with product information and quantities.
 *
 * @param {Object} db - SQLite database instance
 * @returns {Promise<Array>} Array of cart items
 *
 * @example
 * ```javascript
 * const db = await getDatabase();
 * const cartItems = await getCartItems(db);
 * console.log('Cart has', cartItems.length, 'items');
 * ```
 */
export const getCartItems = withServiceErrorHandling(
  async (db) => {
    const items = await db.getAllAsync(
      "SELECT * FROM cart_items ORDER BY created_at DESC"
    );
    return items || [];
  },
  "CART",
  "getItems"
);

/**
 * Updates the quantity of a specific cart item.
 * Modifies the quantity of an existing cart item by product ID.
 *
 * @param {Object} db - SQLite database instance
 * @param {string} productId - Product ID to update
 * @param {number} quantity - New quantity value
 * @returns {Promise<void>} Promise that resolves when quantity is updated
 *
 * @example
 * ```javascript
 * const db = await getDatabase();
 * await updateCartItemQuantity(db, 'product123', 3);
 * ```
 */
export const updateCartItemQuantity = withServiceErrorHandling(
  async (db, productId, quantity) => {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      await db.runAsync("DELETE FROM cart_items WHERE product_id = ?", [
        productId,
      ]);
    } else {
      // Update quantity
      await db.runAsync(
        "UPDATE cart_items SET quantity = ? WHERE product_id = ?",
        [quantity, productId]
      );
    }
  },
  "CART",
  "updateQuantity"
);

/**
 * Removes a specific cart item from SQLite database.
 * Deletes the cart item by product ID.
 *
 * @param {Object} db - SQLite database instance
 * @param {string} productId - Product ID to remove
 * @returns {Promise<void>} Promise that resolves when item is removed
 *
 * @example
 * ```javascript
 * const db = await getDatabase();
 * await removeCartItem(db, 'product123');
 * ```
 */
export const removeCartItem = withServiceErrorHandling(
  async (db, productId) => {
    await db.runAsync("DELETE FROM cart_items WHERE product_id = ?", [
      productId,
    ]);
  },
  "CART",
  "removeItem"
);

/**
 * Clears all cart items from SQLite database.
 * Removes all items from the shopping cart.
 *
 * @param {Object} db - SQLite database instance
 * @returns {Promise<void>} Promise that resolves when cart is cleared
 *
 * @example
 * ```javascript
 * const db = await getDatabase();
 * await clearCart(db);
 * // Cart is now empty
 * ```
 */
export const clearCart = withServiceErrorHandling(
  async (db) => {
    await db.runAsync("DELETE FROM cart_items");
  },
  "CART",
  "clearCart"
);

/**
 * Replaces the entire cart with a new set of items (PUT operation).
 * Clears existing cart and saves all provided items in a single transaction.
 * This ensures the cart matches exactly what's provided.
 *
 * @param {Object} db - SQLite database instance
 * @param {Array} items - Array of cart items to save
 * @returns {Promise<void>} Promise that resolves when cart is replaced
 *
 * @example
 * ```javascript
 * const db = await getDatabase();
 * await replaceCart(db, [
 *   { id: '1', title: 'Product 1', price: 100, quantity: 2, image: 'url1' },
 *   { id: '2', title: 'Product 2', price: 200, quantity: 1, image: 'url2' }
 * ]);
 * ```
 */
export const replaceCart = withServiceErrorHandling(
  async (db, items) => {
    await db.withTransactionAsync(async () => {
      // Clear existing cart
      await db.runAsync("DELETE FROM cart_items");

      // Insert all new items
      for (const item of items) {
        const { id, title, price, quantity, image } = item;
        await db.runAsync(
          `INSERT INTO cart_items (
            product_id, title, price, quantity, image, created_at
          ) VALUES (?, ?, ?, ?, ?, ?)`,
          [id, title, price, quantity, image, new Date().toISOString()]
        );
      }
    });
  },
  "CART",
  "replaceCart"
);

/**
 * Retrieves a specific cart item by product ID.
 * Returns cart item data if found, null otherwise.
 *
 * @param {Object} db - SQLite database instance
 * @param {string} productId - Product ID to find
 * @returns {Promise<Object|null>} Cart item data or null if not found
 *
 * @example
 * ```javascript
 * const db = await getDatabase();
 * const item = await getCartItemById(db, 'product123');
 * if (item) {
 *   console.log('Item quantity:', item.quantity);
 * }
 * ```
 */
export const getCartItemById = withServiceErrorHandling(
  async (db, productId) => {
    const item = await db.getFirstAsync(
      "SELECT * FROM cart_items WHERE product_id = ?",
      [productId]
    );
    return item || null;
  },
  "CART",
  "getItemById"
);
