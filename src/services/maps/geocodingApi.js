/**
 * @fileoverview Google Maps Geocoding API service.
 * Converts addresses to coordinates and vice versa.
 * @author Stocchero
 * @version 1.0.0
 */

import {
  GOOGLE_MAPS_CONFIG,
  validateApiKey,
  handleGoogleMapsError,
} from "./googleMapsApi";

/**
 * Geocode an address to coordinates
 * @param {string} address - Address to geocode
 * @returns {Promise<Object>} Geocoding result with coordinates
 */
export const geocodeAddress = async (address) => {
  try {
    if (!validateApiKey()) {
      throw new Error("Google Maps API key not configured");
    }

    const url = `${GOOGLE_MAPS_CONFIG.baseUrl}${GOOGLE_MAPS_CONFIG.endpoints.geocoding}`;
    const params = new URLSearchParams({
      address: address,
      key: GOOGLE_MAPS_CONFIG.apiKey,
    });

    const response = await fetch(`${url}?${params}`);
    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(handleGoogleMapsError(data));
    }

    const result = data.results[0];
    return {
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng,
      formattedAddress: result.formatted_address,
    };
  } catch (error) {
    throw new Error(`Geocoding error: ${error.message}`);
  }
};

/**
 * Reverse geocode coordinates to address
 * @param {Object} coordinates - Latitude and longitude
 * @param {number} coordinates.latitude - Latitude
 * @param {number} coordinates.longitude - Longitude
 * @returns {Promise<Object>} Reverse geocoding result
 */
export const reverseGeocode = async ({ latitude, longitude }) => {
  try {
    if (!validateApiKey()) {
      throw new Error("Google Maps API key not configured");
    }

    const url = `${GOOGLE_MAPS_CONFIG.baseUrl}${GOOGLE_MAPS_CONFIG.endpoints.geocoding}`;
    const params = new URLSearchParams({
      latlng: `${latitude},${longitude}`,
      key: GOOGLE_MAPS_CONFIG.apiKey,
    });

    const response = await fetch(`${url}?${params}`);
    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error(handleGoogleMapsError(data));
    }

    const result = data.results[0];
    return {
      address: result.formatted_address,
      placeId: result.place_id,
      components: result.address_components,
    };
  } catch (error) {
    throw new Error(`Reverse geocoding error: ${error.message}`);
  }
};
