/**
 * @fileoverview Custom hook for handling Firebase authentication token refresh.
 * Provides a centralized way to get fresh tokens for Firebase API calls.
 * @author Stocchero
 * @version 1.0.0
 */

import { useState, useEffect } from "react";
import { useSQLite } from "./index";

/**
 * Custom hook for Firebase token management
 * Handles token refresh and provides fresh tokens for API calls
 *
 * @returns {Object} Object containing session data and fresh token
 * @returns {Object} returns.session - Session data from SQLite
 * @returns {string} returns.freshToken - Fresh Firebase access token
 * @returns {boolean} returns.isLoading - Loading state
 * @returns {Error} returns.error - Error state
 */
export const useAuthToken = () => {
  const { getSession } = useSQLite();
  const [session, setSession] = useState(null);
  const [freshToken, setFreshToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSessionAndRefreshToken = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get session from SQLite
        const sessionData = await getSession();

        if (!sessionData?.local_id || !sessionData?.refresh_token) {
          setSession(sessionData);
          setIsLoading(false);
          return;
        }

        // Refresh Firebase token
        const refreshResponse = await fetch(
          `https://securetoken.googleapis.com/v1/token?key=${process.env.EXPO_PUBLIC_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              grant_type: "refresh_token",
              refresh_token: sessionData.refresh_token,
            }),
          }
        );

        const refreshData = await refreshResponse.json();

        if (refreshData.access_token) {
          setFreshToken(refreshData.access_token);
          setSession(sessionData);
        } else {
          console.log("❌ Token refresh failed:", refreshData);
          // Fallback to original token if refresh fails
          setFreshToken(sessionData.token);
          setSession(sessionData);
        }
      } catch (err) {
        console.log("❌ Auth token error:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSessionAndRefreshToken();
  }, [getSession]);

  return {
    session,
    freshToken,
    isLoading,
    error,
  };
};
