/**
 * @fileoverview Google Maps Distance Matrix API service.
 * Calculates distances and travel times between locations.
 * @author Stocchero
 * @version 1.0.0
 */

import {
  GOOGLE_MAPS_CONFIG,
  validateApiKey,
  handleGoogleMapsError,
} from "./googleMapsApi";

/**
 * Calculate distance and travel time between two points
 * @param {Object} origin - Origin coordinates
 * @param {number} origin.latitude - Origin latitude
 * @param {number} origin.longitude - Origin longitude
 * @param {Object} destination - Destination coordinates
 * @param {number} destination.latitude - Destination latitude
 * @param {number} destination.longitude - Destination longitude
 * @param {string} [mode='driving'] - Travel mode (driving, walking, bicycling, transit)
 * @returns {Promise<Object>} Distance and time information
 */
export const calculateDistance = async (
  origin,
  destination,
  mode = "driving"
) => {
  try {
    if (!validateApiKey()) {
      throw new Error("Google Maps API key not configured");
    }

    const url = `${GOOGLE_MAPS_CONFIG.baseUrl}${GOOGLE_MAPS_CONFIG.endpoints.distanceMatrix}`;
    const params = new URLSearchParams({
      origins: `${origin.latitude},${origin.longitude}`,
      destinations: `${destination.latitude},${destination.longitude}`,
      mode: mode,
      key: GOOGLE_MAPS_CONFIG.apiKey,
    });

    const response = await fetch(`${url}?${params}`);
    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(handleGoogleMapsError(data));
    }

    const element = data.rows[0].elements[0];

    if (element.status === "ZERO_RESULTS") {
      throw new Error("No se encontró ruta entre los puntos especificados");
    }

    const distanceText = element.distance.text;
    const durationText = element.duration.text;
    const distanceValue = element.distance.value; // in meters
    const durationValue = element.duration.value; // in seconds

    return {
      distance: distanceText,
      duration: durationText,
      distanceValue: distanceValue,
      durationValue: durationValue,
    };
  } catch (error) {
    throw new Error(`Error calculating distance: ${error.message}`);
  }
};

/**
 * Calculate distances to multiple destinations from a single origin
 * @param {Object} origin - Origin coordinates
 * @param {number} origin.latitude - Origin latitude
 * @param {number} origin.longitude - Origin longitude
 * @param {Array} destinations - Array of destination coordinates
 * @param {string} [mode='driving'] - Travel mode
 * @returns {Promise<Array>} Array of distance results
 */
export const calculateDistancesToMultiple = async (
  origin,
  destinations,
  mode = "driving"
) => {
  try {
    if (!validateApiKey()) {
      throw new Error("Google Maps API key not configured");
    }

    const url = `${GOOGLE_MAPS_CONFIG.baseUrl}${GOOGLE_MAPS_CONFIG.endpoints.distanceMatrix}`;
    const destinationsParam = destinations
      .map((dest) => `${dest.latitude},${dest.longitude}`)
      .join("|");

    const params = new URLSearchParams({
      origins: `${origin.latitude},${origin.longitude}`,
      destinations: destinationsParam,
      mode: mode,
      key: GOOGLE_MAPS_CONFIG.apiKey,
    });

    const response = await fetch(`${url}?${params}`);
    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(handleGoogleMapsError(data));
    }

    return data.rows[0].elements.map((element, index) => ({
      destination: destinations[index],
      distance: element.distance?.text || "N/A",
      duration: element.duration?.text || "N/A",
      distanceValue: element.distance?.value || 0,
      durationValue: element.duration?.value || 0,
      status: element.status,
      mode: mode,
    }));
  } catch (error) {
    throw new Error(`Error calculating multiple distances: ${error.message}`);
  }
};

/**
 * Find nearest store to user location
 * @param {Object} userLocation - User coordinates
 * @param {Array} stores - Array of store objects with coordinates
 * @param {string} [mode='driving'] - Travel mode
 * @returns {Promise<Object>} Nearest store with distance information
 */
export const findNearestStore = async (
  userLocation,
  stores,
  mode = "driving"
) => {
  try {
    const distances = await calculateDistancesToMultiple(
      userLocation,
      stores,
      mode
    );

    // Filter out stores with no route available
    const validDistances = distances.filter((d) => d.status === "OK");

    if (validDistances.length === 0) {
      throw new Error("No se encontraron tiendas accesibles");
    }

    // Find the nearest store
    const nearest = validDistances.reduce((prev, current) =>
      current.distanceValue < prev.distanceValue ? current : prev
    );

    return {
      store: stores[distances.indexOf(nearest)],
      distance: nearest.distance,
      duration: nearest.duration,
      distanceValue: nearest.distanceValue,
      durationValue: nearest.durationValue,
    };
  } catch (error) {
    throw new Error(`Error finding nearest store: ${error.message}`);
  }
};
