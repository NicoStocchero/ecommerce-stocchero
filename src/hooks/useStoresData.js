/**
 * @fileoverview Custom hook for stores data management.
 * Handles loading, formatting, and state management of stores data.
 * @author Stocchero
 * @version 1.0.0
 */

import { useState, useEffect } from "react";
import { Alert } from "react-native";

/**
 * Custom hook for stores data management
 * @returns {Object} Stores data and state
 */
export const useStoresData = () => {
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Load and format stores data
   */
  const loadStores = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const storesData = await import("../data/stores.json");
      const formattedStores = storesData.default.map((store) => ({
        id: store.id,
        title: store.name,
        description: store.description,
        coordinates: store.coordinates,
        pinColor: store.pinColor,
        address: store.address,
        phone: store.phone,
        hours: store.hours,
        services: store.services,
        rating: store.rating,
        reviews: store.reviews,
      }));

      setStores(formattedStores);
    } catch (error) {
      setError("No se pudieron cargar las tiendas");
      Alert.alert("Error", "No se pudieron cargar las tiendas");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Get coordinates from stores
   * @returns {Array} Array of coordinate objects
   */
  const getStoresCoordinates = () => {
    return stores.map((store) => store.coordinates);
  };

  /**
   * Find store by ID
   * @param {string|number} id - Store ID
   * @returns {Object|null} Store object or null
   */
  const findStoreById = (id) => {
    return stores.find((store) => store.id === id) || null;
  };

  useEffect(() => {
    loadStores();
  }, []);

  return {
    stores,
    isLoading,
    error,
    getStoresCoordinates,
    findStoreById,
    reloadStores: loadStores,
  };
};
