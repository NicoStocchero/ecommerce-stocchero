/**
 * Professional Error Handler for React Native
 * Provides centralized error handling with proper user feedback and logging
 */

import { Alert } from "react-native";

/**
 * Error types for different categories of errors
 */
export const ERROR_TYPES = {
  NETWORK: "NETWORK",
  AUTHENTICATION: "AUTHENTICATION",
  VALIDATION: "VALIDATION",
  DATABASE: "DATABASE",
  PERMISSION: "PERMISSION",
  UNKNOWN: "UNKNOWN",
};

/**
 * Error severity levels
 */
export const ERROR_SEVERITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
};

/**
 * Error messages for different scenarios
 */
const ERROR_MESSAGES = {
  [ERROR_TYPES.NETWORK]: {
    title: "Error de conexión",
    message:
      "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
    severity: ERROR_SEVERITY.MEDIUM,
  },
  [ERROR_TYPES.AUTHENTICATION]: {
    title: "Error de autenticación",
    message:
      "Tu sesión ha expirado o no tienes permisos para realizar esta acción.",
    severity: ERROR_SEVERITY.HIGH,
  },
  [ERROR_TYPES.VALIDATION]: {
    title: "Datos inválidos",
    message:
      "Los datos ingresados no son válidos. Por favor, verifica la información.",
    severity: ERROR_SEVERITY.LOW,
  },
  [ERROR_TYPES.DATABASE]: {
    title: "Error de base de datos",
    message: "No se pudo acceder a los datos. Intenta nuevamente.",
    severity: ERROR_SEVERITY.MEDIUM,
  },
  [ERROR_TYPES.PERMISSION]: {
    title: "Permisos requeridos",
    message: "Esta función requiere permisos adicionales.",
    severity: ERROR_SEVERITY.MEDIUM,
  },
  [ERROR_TYPES.UNKNOWN]: {
    title: "Error inesperado",
    message: "Ocurrió un error inesperado. Intenta nuevamente.",
    severity: ERROR_SEVERITY.MEDIUM,
  },
};

/**
 * Determines the error type based on the error object
 * @param {Error} error - The error object
 * @returns {string} The error type
 */
const getErrorType = (error) => {
  if (!error) return ERROR_TYPES.UNKNOWN;

  const errorMessage = error.message?.toLowerCase() || "";
  const errorCode = error.code || error.status || "";

  // Network errors
  if (
    errorMessage.includes("network") ||
    errorMessage.includes("fetch") ||
    errorCode === "NETWORK_ERROR" ||
    errorCode === 0
  ) {
    return ERROR_TYPES.NETWORK;
  }

  // Authentication errors
  if (
    errorMessage.includes("auth") ||
    errorMessage.includes("token") ||
    errorMessage.includes("unauthorized") ||
    errorCode === 401 ||
    errorCode === 403
  ) {
    return ERROR_TYPES.AUTHENTICATION;
  }

  // Validation errors
  if (
    errorMessage.includes("validation") ||
    errorMessage.includes("invalid") ||
    errorCode === 400
  ) {
    return ERROR_TYPES.VALIDATION;
  }

  // Database errors
  if (
    errorMessage.includes("database") ||
    errorMessage.includes("sql") ||
    errorCode === 500
  ) {
    return ERROR_TYPES.DATABASE;
  }

  // Permission errors
  if (errorMessage.includes("permission") || errorMessage.includes("denied")) {
    return ERROR_TYPES.PERMISSION;
  }

  return ERROR_TYPES.UNKNOWN;
};

/**
 * Logs error information for debugging (in production, this could send to a service)
 * @param {Error} error - The error object
 * @param {string} context - The context where the error occurred
 * @param {string} type - The error type
 */
const logError = (error, context, type) => {
  // In a real production app, this would send to a service like Sentry, Crashlytics, etc.
  // For now, we'll store in memory or send to a logging service
  const errorInfo = {
    timestamp: new Date().toISOString(),
    type,
    context,
    message: error?.message || "Unknown error",
    stack: error?.stack,
    code: error?.code || error?.status,
  };

  // Store in memory for debugging (in production, remove this)
  if (__DEV__) {
    // Only in development - in production this would be sent to a service
    global.errorLog = global.errorLog || [];
    global.errorLog.push(errorInfo);
  }
};

/**
 * Shows an alert to the user based on error type
 * @param {string} type - The error type
 * @param {string} customMessage - Optional custom message to override default
 */
const showUserAlert = (type, customMessage = null) => {
  const errorConfig =
    ERROR_MESSAGES[type] || ERROR_MESSAGES[ERROR_TYPES.UNKNOWN];

  Alert.alert(errorConfig.title, customMessage || errorConfig.message, [
    {
      text: "OK",
      style: "default",
    },
  ]);
};

/**
 * Main error handler function
 * @param {Error} error - The error object
 * @param {string} context - The context where the error occurred (e.g., 'Profile.uploadImage')
 * @param {Object} options - Additional options
 * @param {boolean} options.showAlert - Whether to show an alert to the user (default: true)
 * @param {string} options.customMessage - Custom message to show instead of default
 * @param {Function} options.onError - Callback function to execute after error handling
 * @returns {Object} Error information for further handling
 */
export const handleError = (error, context, options = {}) => {
  const { showAlert = true, customMessage = null, onError = null } = options;

  const errorType = getErrorType(error);
  const errorInfo = {
    type: errorType,
    severity: ERROR_MESSAGES[errorType].severity,
    context,
    originalError: error,
  };

  // Log the error
  logError(error, context, errorType);

  // Show alert to user if requested
  if (showAlert) {
    showUserAlert(errorType, customMessage);
  }

  // Execute custom error handler if provided
  if (onError && typeof onError === "function") {
    onError(errorInfo);
  }

  return errorInfo;
};

/**
 * Wraps an async function with error handling
 * @param {Function} asyncFn - The async function to wrap
 * @param {string} context - The context for error handling
 * @param {Object} options - Error handling options
 * @returns {Function} Wrapped function with error handling
 */
export const withErrorHandling = (asyncFn, context, options = {}) => {
  return async (...args) => {
    try {
      return await asyncFn(...args);
    } catch (error) {
      return handleError(error, context, options);
    }
  };
};

/**
 * Creates a safe callback that handles errors
 * @param {Function} callback - The callback function
 * @param {string} context - The context for error handling
 * @param {Object} options - Error handling options
 * @returns {Function} Safe callback with error handling
 */
export const createSafeCallback = (callback, context, options = {}) => {
  return (...args) => {
    try {
      return callback(...args);
    } catch (error) {
      return handleError(error, context, options);
    }
  };
};
