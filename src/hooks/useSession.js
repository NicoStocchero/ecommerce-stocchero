/**
 * @fileoverview Custom hook for managing user session operations.
 * Handles session loading, logout, and cleanup with proper error handling.
 * @author Stocchero
 * @version 1.0.0
 */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSQLite } from "./useSQLite";
import { updateProfileImage, logout } from "../features/user/userSlice";
import { withErrorHandling } from "../utils/errorHandler";

/**
 * Custom hook for managing user session operations.
 * Provides session loading, logout, and cleanup functionality.
 *
 * @returns {Object} Session management utilities
 * @returns {function} returns.handleLogout - Function to handle user logout
 * @returns {boolean} returns.isAuthenticated - Current authentication status
 * @returns {Object|null} returns.user - Current user data
 *
 * @example
 * ```javascript
 * const { handleLogout, isAuthenticated, user } = useSession();
 *
 * const onLogoutPress = () => {
 *   handleLogout();
 * };
 * ```
 */
export const useSession = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { clearSession, getSession } = useSQLite();

  /**
   * Loads profile image from database on component mount.
   * Automatically loads saved profile image when user is authenticated.
   */
  useEffect(() => {
    const loadProfileImage = withErrorHandling(
      async () => {
        const session = await getSession();
        if (session && session.profileImage) {
          dispatch(updateProfileImage(session.profileImage));
        }
      },
      "useSession.loadProfileImage",
      { showAlert: false }
    );

    if (isAuthenticated && user) {
      loadProfileImage();
    }
  }, [isAuthenticated, user, getSession, dispatch]);

  /**
   * Handles user logout with proper cleanup.
   * Clears both SQLite session and Redux state.
   *
   * @returns {Promise<void>}
   */
  const handleLogout = withErrorHandling(
    async () => {
      // Clear SQLite session
      await clearSession();
      // Clear Redux state
      dispatch(logout());
      // Navigation is handled by RootNavigator based on auth state
    },
    "useSession.handleLogout",
    { showAlert: false }
  );

  return {
    handleLogout,
    isAuthenticated,
    user,
  };
};
