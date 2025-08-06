/**
 * @fileoverview Unified error service for consistent error handling across all services.
 * Provides standardized error handling patterns for API calls, database operations, and user interactions.
 * @author Stocchero
 * @version 1.0.0
 */

import { handleError } from "../utils/errorHandler";

/**
 * Error handling configuration for different service types
 */
const ERROR_CONFIGS = {
  AUTH: {
    context: "authService",
    showAlert: true,
    severity: "HIGH",
  },
  PROFILE: {
    context: "profileService",
    showAlert: true,
    severity: "MEDIUM",
  },
  CART: {
    context: "cartService",
    showAlert: false,
    severity: "LOW",
  },
  SHOP: {
    context: "shopService",
    showAlert: false,
    severity: "MEDIUM",
  },
  DATABASE: {
    context: "databaseService",
    showAlert: false,
    severity: "HIGH",
  },
};

/**
 * Creates a standardized error response for RTK Query
 * @param {Error} error - The error object
 * @param {string} serviceType - Type of service (AUTH, PROFILE, etc.)
 * @param {string} operation - Specific operation that failed
 * @returns {Object} Standardized error response
 */
export const createErrorResponse = (error, serviceType, operation) => {
  const config = ERROR_CONFIGS[serviceType] || ERROR_CONFIGS.DATABASE;

  // Log error silently for background operations
  handleError(error, `${config.context}.${operation}`, { showAlert: false });

  return {
    error: {
      status: error.status || 500,
      data: error.message || "An unexpected error occurred",
      type: serviceType,
      operation,
    },
  };
};

/**
 * Wraps async operations with consistent error handling
 * @param {Function} asyncOperation - The async function to wrap
 * @param {string} serviceType - Type of service
 * @param {string} operation - Operation name
 * @param {Object} options - Additional options
 * @returns {Function} Wrapped function with error handling
 */
export const withServiceErrorHandling = (
  asyncOperation,
  serviceType,
  operation,
  options = {}
) => {
  return async (...args) => {
    try {
      return await asyncOperation(...args);
    } catch (error) {
      const config = ERROR_CONFIGS[serviceType] || ERROR_CONFIGS.DATABASE;

      // Handle error based on service type
      handleError(error, `${config.context}.${operation}`, {
        showAlert: config.showAlert,
        customMessage: options.customMessage,
        onError: options.onError,
      });

      // Return standardized error response for RTK Query
      return createErrorResponse(error, serviceType, operation);
    }
  };
};

/**
 * Validates required parameters for service operations
 * @param {Object} params - Parameters to validate
 * @param {Array} requiredFields - Array of required field names
 * @param {string} operation - Operation name for error context
 * @throws {Error} If required parameters are missing
 */
export const validateRequiredParams = (params, requiredFields, operation) => {
  const missingFields = requiredFields.filter((field) => !params[field]);

  if (missingFields.length > 0) {
    throw new Error(
      `Missing required parameters for ${operation}: ${missingFields.join(
        ", "
      )}`
    );
  }
};

/**
 * Creates a success response wrapper for RTK Query
 * @param {any} data - The data to return
 * @returns {Object} Standardized success response
 */
export const createSuccessResponse = (data) => {
  return { data };
};

/**
 * Service-specific error handlers
 */
export const serviceErrorHandlers = {
  /**
   * Authentication service error handler
   */
  auth: {
    handleLoginError: (error) => createErrorResponse(error, "AUTH", "login"),
    handleSignupError: (error) => createErrorResponse(error, "AUTH", "signup"),
    handleTokenRefreshError: (error) =>
      createErrorResponse(error, "AUTH", "tokenRefresh"),
  },

  /**
   * Profile service error handler
   */
  profile: {
    handleImageUploadError: (error) =>
      createErrorResponse(error, "PROFILE", "imageUpload"),
    handleProfileUpdateError: (error) =>
      createErrorResponse(error, "PROFILE", "profileUpdate"),
    handleProfileFetchError: (error) =>
      createErrorResponse(error, "PROFILE", "profileFetch"),
  },

  /**
   * Cart service error handler
   */
  cart: {
    handleSaveItemError: (error) =>
      createErrorResponse(error, "CART", "saveItem"),
    handleRemoveItemError: (error) =>
      createErrorResponse(error, "CART", "removeItem"),
    handleClearCartError: (error) =>
      createErrorResponse(error, "CART", "clearCart"),
  },

  /**
   * Database service error handler
   */
  database: {
    handleSessionError: (error) =>
      createErrorResponse(error, "DATABASE", "session"),
    handleMigrationError: (error) =>
      createErrorResponse(error, "DATABASE", "migration"),
  },
};
