/**
 * @fileoverview Store locator screen with map and store information.
 * Displays store locations on a map with user location and store details.
 * @author Stocchero
 * @version 1.0.0
 */

import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Alert, Linking } from "react-native";
import { GoogleMap, MapControls, StoresList } from "../../components/Maps";
import { StoreCard } from "../../components/UI";
import { useLocation, useMapControl, useStoresData } from "../../hooks";
import colors from "../../global/colors";

/**
 * Store locator screen component
 * @returns {React.JSX.Element} Rendered store locator screen
 */
const StoreLocator = () => {
  const mapRef = useRef(null);
  const [selectedStore, setSelectedStore] = useState(null);

  // Custom hooks for separation of concerns
  const { location, getCurrentLocation } = useLocation();
  const { stores, isLoading: storesLoading } = useStoresData();
  const { fitToCoordinates, animateToRegion } = useMapControl(mapRef);

  // Initialize location
  useEffect(() => {
    initializeLocation();
  }, []);

  /**
   * Initialize user location
   */
  const initializeLocation = async () => {
    try {
      const coords = await getCurrentLocation();
      if (coords) {
        // Check if location is emulator default (Mountain View)
        const isEmulator =
          coords.latitude === 37.4219999 && coords.longitude === -122.0840575;

        if (isEmulator) {
          // Don't auto-zoom to Córdoba, just let the map show the default region
          // The user can manually press the location button if they want
        }
      }
    } catch (error) {
      // Continue without location - user can still use the map
    }
  };

  /**
   * Handle my location button press
   */
  const handleMyLocation = async () => {
    try {
      const coords = await getCurrentLocation();
      if (coords) {
        const isEmulator =
          coords.latitude === 37.4219999 && coords.longitude === -122.0840575;

        if (isEmulator) {
          Alert.alert(
            "Ubicación del Emulador",
            "¿Usar ubicación de Córdoba como alternativa?",
            [
              { text: "Cancelar", style: "cancel" },
              {
                text: "Usar Córdoba",
                onPress: () => {
                  animateToRegion({
                    latitude: -31.4167,
                    longitude: -64.1833,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                  });
                },
              },
            ]
          );
        } else {
          animateToRegion({
            ...coords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
      }
    } catch (error) {
      Alert.alert(
        "Error de ubicación",
        "No se pudo obtener tu ubicación actual."
      );
    }
  };

  /**
   * Handle fit all stores button press
   */
  const handleFitAllStores = () => {
    if (stores.length > 0) {
      const coordinates = stores.map((store) => store.coordinates);
      fitToCoordinates(coordinates);
    }
  };

  /**
   * Handle store selection from list
   */
  const handleStoreSelect = (store) => {
    setSelectedStore(store);
    animateToRegion({
      ...store.coordinates,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  /**
   * Handle store press on map marker
   */
  const handleStorePress = (store) => {
    setSelectedStore(store);
  };

  /**
   * Handle store details button press
   */
  const handleStoreDetails = (store) => {
    Alert.alert(
      store.title,
      `¿Qué te gustaría hacer?\n\n📍 ${store.address}\n🕒 ${store.hours}`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Abrir en Maps",
          onPress: () => {
            const { latitude, longitude } = store.coordinates;
            const url = `https://maps.google.com/maps?q=${latitude},${longitude}`;
            Linking.openURL(url);
          },
        },
        {
          text: "Llamar",
          onPress: () => {
            if (store.phone) {
              Linking.openURL(`tel:${store.phone}`);
            } else {
              Alert.alert("Información", "Número de teléfono no disponible");
            }
          },
        },
      ]
    );
  };

  /**
   * Format services array for display
   */
  const formatServices = (services) => {
    return services.join(" • ");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nuestras Tiendas</Text>
        <Text style={styles.subtitle}>
          Encuentra la tienda más cercana a tu ubicación
        </Text>
      </View>

      <View style={styles.mapContainer}>
        <GoogleMap
          ref={mapRef}
          markers={stores}
          showsUserLocation={true}
          onMarkerPress={handleStorePress}
        />

        <MapControls
          onMyLocation={handleMyLocation}
          onFitAllStores={handleFitAllStores}
        />
      </View>

      <StoresList
        stores={stores}
        selectedStore={selectedStore}
        onStoreSelect={handleStoreSelect}
        formatServices={formatServices}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  title: {
    fontFamily: "Inter_18pt-Bold",
    fontSize: 24,
    color: colors.textPrimary,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 16,
    color: colors.gray600,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  mapContainer: {
    flex: 1,
    position: "relative",
    borderRadius: 8,
    margin: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.gray100,
  },
});

export default StoreLocator;
