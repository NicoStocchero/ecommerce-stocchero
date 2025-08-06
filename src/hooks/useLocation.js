/**
 * @fileoverview Custom hook for location management with modern practices.
 * Handles location permissions, current location, and location updates.
 * @author Stocchero
 * @version 1.0.0
 */

import { useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";

/**
 * Location state interface
 * @typedef {Object} LocationState
 * @property {Object|null} coordinates - Current coordinates
 * @property {string|null} address - Formatted address
 * @property {boolean} isLoading - Loading state
 * @property {string|null} error - Error message
 * @property {boolean} hasPermission - Permission status
 */

/**
 * Custom hook for location management
 * @returns {Object} Location state and functions
 * @returns {LocationState} returns.location - Current location state
 * @returns {function} returns.requestPermission - Request location permission
 * @returns {function} returns.getCurrentLocation - Get current location
 * @returns {function} returns.startLocationUpdates - Start location updates
 * @returns {function} returns.stopLocationUpdates - Stop location updates
 */
export const useLocation = () => {
  const [location, setLocation] = useState({
    coordinates: null,
    address: null,
    isLoading: false,
    error: null,
    hasPermission: false,
  });

  const [locationSubscription, setLocationSubscription] = useState(null);

  /**
   * Request location permission
   * @returns {Promise<boolean>} Whether permission was granted
   */
  const requestPermission = useCallback(async () => {
    try {
      setLocation((prev) => ({ ...prev, isLoading: true, error: null }));

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocation((prev) => ({
          ...prev,
          isLoading: false,
          hasPermission: false,
          error: "Se requiere permiso de ubicación para esta funcionalidad",
        }));
        return false;
      }

      setLocation((prev) => ({
        ...prev,
        isLoading: false,
        hasPermission: true,
        error: null,
      }));

      return true;
    } catch (error) {
      setLocation((prev) => ({
        ...prev,
        isLoading: false,
        error: "Error al solicitar permisos de ubicación",
      }));
      return false;
    }
  }, []);

  /**
   * Get current location
   * @returns {Promise<Object|null>} Current location coordinates
   */
  const getCurrentLocation = useCallback(async () => {
    try {
      if (!location.hasPermission) {
        const hasPermission = await requestPermission();
        if (!hasPermission) {
          return null;
        }
      }

      setLocation((prev) => ({ ...prev, isLoading: true, error: null }));

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000,
        distanceInterval: 10,
        maximumAge: 60000, // 1 minute cache
      });

      const { latitude, longitude } = currentLocation.coords;
      setLocation((prev) => ({
        ...prev,
        coordinates: { latitude, longitude },
      }));

      // Get address from coordinates
      try {
        const address = await Location.reverseGeocodeAsync({
          latitude: latitude,
          longitude: longitude,
        });
        setLocation((prev) => ({ ...prev, address: address[0].street }));
      } catch (geocodeError) {
        // Continue without address
      }

      setLocation((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
      }));

      return currentLocation.coords;
    } catch (error) {
      setLocation((prev) => ({
        ...prev,
        isLoading: false,
        error: "Error al obtener la ubicación actual",
      }));
      return null;
    }
  }, [location.hasPermission, requestPermission]);

  /**
   * Start location updates
   * @param {Object} options - Location update options
   * @param {number} options.accuracy - Location accuracy
   * @param {number} options.timeInterval - Update interval in ms
   * @param {number} options.distanceInterval - Distance interval in meters
   */
  const startLocationUpdates = useCallback(
    async (options = {}) => {
      try {
        if (!location.hasPermission) {
          const hasPermission = await requestPermission();
          if (!hasPermission) return;
        }

        const subscription = await Location.watchPositionAsync(
          {
            accuracy: options.accuracy || Location.Accuracy.Balanced,
            timeInterval: options.timeInterval || 10000,
            distanceInterval: options.distanceInterval || 10,
          },
          (newLocation) => {
            const coordinates = {
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
            };

            setLocation((prev) => ({
              ...prev,
              coordinates,
              error: null,
            }));
          }
        );

        setLocationSubscription(subscription);
      } catch (error) {
        setLocation((prev) => ({
          ...prev,
          error: "Error al iniciar actualizaciones de ubicación",
        }));
      }
    },
    [location.hasPermission, requestPermission]
  );

  /**
   * Stop location updates
   */
  const stopLocationUpdates = useCallback(() => {
    if (locationSubscription) {
      locationSubscription.remove();
      setLocationSubscription(null);
    }
  }, [locationSubscription]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [locationSubscription]);

  return {
    location,
    requestPermission,
    getCurrentLocation,
    startLocationUpdates,
    stopLocationUpdates,
  };
};
