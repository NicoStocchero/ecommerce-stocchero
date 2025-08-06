/**
 * @fileoverview SQLite session management service for user authentication persistence.
 * Provides functions to save, retrieve, and clear user session data in local SQLite database.
 * @author Stocchero
 * @version 1.0.0
 */

import { withServiceErrorHandling } from "../errorService";

/**
 * Saves user session data to SQLite database.
 * Stores authentication tokens and user information for persistent login.
 *
 * @param {Object} db - SQLite database instance
 * @param {Object} userData - User session data to save
 * @param {string} userData.email - User's email address
 * @param {string} userData.localId - User's unique ID
 * @param {string} userData.token - JWT authentication token
 * @param {string} userData.refreshToken - Token for refreshing authentication
 * @param {string} [userData.profileImage] - User's profile image URI
 * @returns {Promise<void>} Promise that resolves when session is saved
 *
 * @example
 * ```javascript
 * const db = await getDatabase();
 * await saveUserSession(db, {
 *   email: 'user@example.com',
 *   localId: 'user123',
 *   token: 'jwt-token',
 *   refreshToken: 'refresh-token'
 * });
 * ```
 */
export const saveUserSession = withServiceErrorHandling(
  async (db, userData) => {
    const { email, localId, token, refreshToken, profileImage } = userData;

    // Clear existing session first
    await db.runAsync("DELETE FROM user_sessions");

    // Insert new session data
    await db.runAsync(
      `INSERT INTO user_sessions (
        email, local_id, token, refresh_token, profile_image, created_at
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        email,
        localId,
        token,
        refreshToken,
        profileImage || null,
        new Date().toISOString(),
      ]
    );
  },
  "DATABASE",
  "saveSession"
);

/**
 * Retrieves user session data from SQLite database.
 * Returns the most recent session data if available.
 *
 * @param {Object} db - SQLite database instance
 * @returns {Promise<Object|null>} User session data or null if no session exists
 *
 * @example
 * ```javascript
 * const db = await getDatabase();
 * const session = await getUserSession(db);
 * if (session) {
 *   console.log('User is logged in:', session.email);
 * }
 * ```
 */
export const getUserSession = withServiceErrorHandling(
  async (db) => {
    const result = await db.getFirstAsync(
      "SELECT * FROM user_sessions ORDER BY created_at DESC LIMIT 1"
    );
    return result || null;
  },
  "DATABASE",
  "getSession"
);

/**
 * Clears all user session data from SQLite database.
 * Used during logout to remove persistent authentication data.
 *
 * @param {Object} db - SQLite database instance
 * @returns {Promise<void>} Promise that resolves when session is cleared
 *
 * @example
 * ```javascript
 * const db = await getDatabase();
 * await clearUserSession(db);
 * // User is now logged out
 * ```
 */
export const clearUserSession = withServiceErrorHandling(
  async (db) => {
    await db.runAsync("DELETE FROM user_sessions");
  },
  "DATABASE",
  "clearSession"
);

/**
 * Checks if there is an active user session in the database.
 * Returns true if session data exists, false otherwise.
 *
 * @param {Object} db - SQLite database instance
 * @returns {Promise<boolean>} True if active session exists, false otherwise
 *
 * @example
 * ```javascript
 * const db = await getDatabase();
 * const hasSession = await hasActiveSession(db);
 * if (hasSession) {
 *   // User is already logged in
 * }
 * ```
 */
export const hasActiveSession = withServiceErrorHandling(
  async (db) => {
    const result = await db.getFirstAsync(
      "SELECT COUNT(*) as count FROM user_sessions"
    );
    return result && result.count > 0;
  },
  "DATABASE",
  "checkSession"
);
