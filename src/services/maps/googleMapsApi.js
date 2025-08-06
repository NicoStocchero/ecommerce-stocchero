/**
 * @fileoverview Google Maps API service configuration and utilities.
 * Provides base configuration for all Google Maps related services.
 * @author Stocchero
 * @version 1.0.0
 */

// Environment variables
const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GMAPS_API_KEY;

/**
 * Base configuration for Google Maps APIs
 */
export const GOOGLE_MAPS_CONFIG = {
  apiKey: GOOGLE_MAPS_API_KEY,
  baseUrl: "https://maps.googleapis.com/maps/api",
  endpoints: {
    geocoding: "/geocode/json",
    places: "/place",
    distanceMatrix: "/distancematrix/json",
    directions: "/directions/json",
  },
};

/**
 * Validate API key configuration
 * @returns {boolean} Whether API key is properly configured
 */
export const validateApiKey = () => {
  const apiKey = process.env.EXPO_PUBLIC_GMAPS_API_KEY;
  if (!apiKey) {
    throw new Error("Google Maps API key not configured");
  }
  return apiKey;
};

/**
 * Create base headers for API requests
 * @returns {Object} Headers object
 */
export const createBaseHeaders = () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
});

/**
 * Handle Google Maps API errors
 * @param {Object} error - Error response from API
 * @returns {string} User-friendly error message
 */
export const handleGoogleMapsError = (error) => {
  if (error?.status === "REQUEST_DENIED") {
    return "Error de configuración de mapas";
  }
  if (error?.status === "OVER_QUERY_LIMIT") {
    return "Límite de consultas excedido";
  }
  if (error?.status === "ZERO_RESULTS") {
    return "No se encontraron resultados";
  }
  return "Error al procesar la ubicación";
};
