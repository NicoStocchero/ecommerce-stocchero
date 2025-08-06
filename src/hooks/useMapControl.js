/**
 * @fileoverview Custom hook for map control operations.
 * Handles map fitting, region calculations, and map interactions.
 * @author Stocchero
 * @version 1.0.0
 */

import { useCallback } from "react";

/**
 * Custom hook for map control operations
 * @param {React.RefObject} mapRef - Reference to the map component
 * @returns {Object} Map control functions
 */
export const useMapControl = (mapRef) => {
  /**
   * Fit map to show all markers with coordinates
   * @param {Array} coordinates - Array of coordinate objects
   * @param {Object} options - Fitting options
   */
  const fitToCoordinates = useCallback(
    (coordinates, options = {}) => {
      if (!mapRef.current || !coordinates.length) return;

      const defaultOptions = {
        edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
        animated: true,
      };
      const finalOptions = { ...defaultOptions, ...options };

      try {
        mapRef.current.fitToCoordinates(coordinates, finalOptions);
      } catch (error) {
        // Fallback to manual calculation
        fitToCoordinatesManual(coordinates, finalOptions);
      }
    },
    [mapRef]
  );

  /**
   * Manual calculation fallback for fitting coordinates
   * @param {Array} coordinates - Array of coordinate objects
   * @param {Object} options - Fitting options
   */
  const fitToCoordinatesManual = useCallback(
    (coordinates, options = {}) => {
      if (!mapRef.current || !coordinates.length) return;

      try {
        const lats = coordinates.map((coord) => coord.latitude);
        const lngs = coordinates.map((coord) => coord.longitude);

        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLng = Math.min(...lngs);
        const maxLng = Math.max(...lngs);

        const latPadding = (maxLat - minLat) * 0.15;
        const lngPadding = (maxLng - minLng) * 0.15;

        const minDelta = 0.01;
        const latDelta = Math.max(maxLat - minLat + latPadding, minDelta);
        const lngDelta = Math.max(maxLng - minLng + lngPadding, minDelta);

        const region = {
          latitude: (minLat + maxLat) / 2,
          longitude: (minLng + maxLng) / 2,
          latitudeDelta: latDelta,
          longitudeDelta: lngDelta,
        };

        mapRef.current.animateToRegion(region, 1000);
      } catch (error) {
        // Final fallback - animate to first coordinate
        if (coordinates[0]) {
          mapRef.current.animateToRegion(
            {
              ...coordinates[0],
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            },
            1000
          );
        }
      }
    },
    [mapRef]
  );

  /**
   * Animate to specific region
   * @param {Object} region - Region to animate to
   * @param {number} duration - Animation duration in ms
   */
  const animateToRegion = useCallback(
    (region, duration = 1000) => {
      if (mapRef.current && region) {
        mapRef.current.animateToRegion(region, duration);
      }
    },
    [mapRef]
  );

  return {
    fitToCoordinates,
    fitToCoordinatesManual,
    animateToRegion,
  };
};
