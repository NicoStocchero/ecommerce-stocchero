/**
 * @fileoverview SQLite database initialization and migration utilities.
 * Provides functions to initialize, migrate, and manage the local SQLite database.
 * @author Stocchero
 * @version 1.0.0
 */

import * as SQLite from "expo-sqlite";
import { withServiceErrorHandling } from "../services/errorService";

/**
 * Database migration function to create required tables.
 * Sets up the database schema for user sessions and cart items.
 *
 * @param {Object} db - SQLite database instance
 * @returns {Promise<void>} Promise that resolves when migration is complete
 *
 * @example
 * ```javascript
 * const db = await getDatabase();
 * await migrateDatabase(db);
 * ```
 */
export const migrateDatabase = withServiceErrorHandling(
  async (db) => {
    // Create user sessions table
    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS user_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        local_id TEXT NOT NULL,
        token TEXT,
        refresh_token TEXT,
        profile_image TEXT,
        created_at TEXT NOT NULL
      )
    `);

    // Create cart items table
    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        image TEXT,
        created_at TEXT NOT NULL
      )
    `);

    // Create indexes for better performance
    await db.runAsync(`
      CREATE INDEX IF NOT EXISTS idx_user_sessions_email 
      ON user_sessions(email)
    `);

    await db.runAsync(`
      CREATE INDEX IF NOT EXISTS idx_cart_items_product_id 
      ON cart_items(product_id)
    `);
  },
  "DATABASE",
  "migration"
);

/**
 * Initializes the SQLite database with proper configuration.
 * Creates the database instance and runs migrations to set up the schema.
 *
 * @param {string} databaseName - Name of the database file
 * @returns {Promise<Object>} Configured SQLite database instance
 *
 * @example
 * ```javascript
 * const db = await initializeDatabase('ecommerce-app.db');
 * // Database is ready to use
 * ```
 */
export const initializeDatabase = withServiceErrorHandling(
  async (databaseName = "ecommerce-app.db") => {
    // Open database connection
    const db = await SQLite.openDatabaseAsync(databaseName);

    // Run database migrations
    await migrateDatabase(db);

    return db;
  },
  "DATABASE",
  "initialization"
);

/**
 * Deletes the SQLite database file.
 * Used for testing or complete data reset scenarios.
 *
 * @param {string} databaseName - Name of the database file to delete
 * @returns {Promise<void>} Promise that resolves when database is deleted
 *
 * @example
 * ```javascript
 * await deleteDatabase('ecommerce-app.db');
 * // Database file has been removed
 * ```
 */
export const deleteDatabase = withServiceErrorHandling(
  async (databaseName = "ecommerce-app.db") => {
    await SQLite.deleteDatabaseAsync(databaseName);
  },
  "DATABASE",
  "deletion"
);
