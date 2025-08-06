/**
 * @fileoverview Google Maps component using react-native-maps.
 * Provides a reusable map component with modern styling and functionality.
 * @author Stocchero
 * @version 1.0.0
 */

import React, { useRef, useEffect, useState, forwardRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import colors from "../../global/colors";

/**
 * GoogleMap component props
 * @typedef {Object} GoogleMapProps
 * @property {Object} [initialRegion] - Initial map region
 * @property {Array} [markers] - Array of markers to display
 * @property {boolean} [showsUserLocation=false] - Whether to show user location
 * @property {boolean} [followsUserLocation=false] - Whether to follow user location
 * @property {function} [onMarkerPress] - Callback when marker is pressed
 * @property {function} [onRegionChange] - Callback when region changes
 * @property {Object} [style] - Additional style object
 */

/**
 * Reusable Google Maps component with modern styling and functionality.
 * Supports markers, user location, and custom interactions.
 *
 * @component
 * @param {GoogleMapProps} props - Component props
 * @param {React.Ref} ref - Forwarded ref for map control
 * @returns {React.JSX.Element} Rendered map component
 *
 * @example
 * ```javascript
 * // Basic map with user location
 * <GoogleMap
 *   showsUserLocation={true}
 *   markers={stores}
 *   onMarkerPress={handleStorePress}
 * />
 * ```
 */
const GoogleMap = forwardRef(
  (
    {
      initialRegion,
      markers = [],
      showsUserLocation = false,
      followsUserLocation = false,
      onMarkerPress,
      onRegionChange,
      style,
    },
    ref
  ) => {
    const mapRef = useRef(null);
    const [currentRegion, setCurrentRegion] = useState(null);

    // Default region (Córdoba, Argentina) - only used as fallback
    const defaultRegion = {
      latitude: -31.4167,
      longitude: -64.1833,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    };

    // Use provided initial region or default
    const region = initialRegion || defaultRegion;

    /**
     * Handle marker press
     * @param {Object} marker - Marker data
     */
    const handleMarkerPress = (marker) => {
      if (onMarkerPress) {
        onMarkerPress(marker);
      }
    };

    /**
     * Animate to specific coordinates
     * @param {Object} coordinates - Target coordinates
     * @param {number} coordinates.latitude - Latitude
     * @param {number} coordinates.longitude - Longitude
     */
    const animateToRegion = (coordinates) => {
      if (mapRef.current && coordinates) {
        const newRegion = {
          ...coordinates,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        mapRef.current.animateToRegion(newRegion, 1000);
        setCurrentRegion(newRegion);
      }
    };

    /**
     * Fit map to show all markers
     */
    const fitToMarkers = () => {
      if (mapRef.current && markers.length > 0) {
        const coordinates = markers.map((marker) => marker.coordinates);
        mapRef.current.fitToCoordinates(coordinates, {
          edgePadding: { top: 60, right: 60, bottom: 60, left: 60 }, // Reduced from 100 to 60
          animated: true,
        });
      }
    };

    /**
     * Handle region change
     * @param {Object} newRegion - New region data
     */
    const handleRegionChange = (newRegion) => {
      setCurrentRegion(newRegion);
      if (onRegionChange) {
        onRegionChange(newRegion);
      }
    };

    // Expose methods via ref
    React.useImperativeHandle(
      ref,
      () => ({
        animateToRegion: (coordinates) => {
          if (mapRef.current && coordinates) {
            const newRegion = {
              ...coordinates,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            };
            mapRef.current.animateToRegion(newRegion, 1000);
            setCurrentRegion(newRegion);
          }
        },
        fitToMarkers: () => {
          if (mapRef.current && markers.length > 0) {
            const coordinates = markers.map((marker) => marker.coordinates);
            mapRef.current.fitToCoordinates(coordinates, {
              edgePadding: { top: 60, right: 60, bottom: 60, left: 60 }, // Reduced from 100 to 60
              animated: true,
            });
          }
        },
        fitToCoordinates: (coordinates, options = {}) => {
          if (mapRef.current && coordinates.length > 0) {
            const defaultOptions = {
              edgePadding: { top: 60, right: 60, bottom: 60, left: 60 }, // Reduced from 100 to 60
              animated: true,
            };
            const finalOptions = { ...defaultOptions, ...options };
            mapRef.current.fitToCoordinates(coordinates, finalOptions);
          }
        },
      }),
      [markers]
    );

    return (
      <View style={[styles.container, style]}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          showsUserLocation={showsUserLocation}
          followsUserLocation={followsUserLocation}
          showsMyLocationButton={showsUserLocation}
          showsCompass={true}
          showsScale={true}
          showsTraffic={false}
          showsBuildings={true}
          onRegionChange={handleRegionChange}
          mapType="standard"
          loadingEnabled={true}
          loadingIndicatorColor={colors.primary}
          loadingBackgroundColor={colors.white}
          toolbarEnabled={false}
          zoomEnabled={true}
          scrollEnabled={true}
          rotateEnabled={true}
          pitchEnabled={true}
          minZoomLevel={10}
          maxZoomLevel={20}
        >
          {markers.map((marker, index) => (
            <Marker
              key={marker.id || index}
              coordinate={marker.coordinates}
              title={marker.title}
              description={marker.description}
              onPress={() => handleMarkerPress(marker)}
              pinColor={marker.pinColor || colors.primary}
              tracksViewChanges={false}
            />
          ))}
        </MapView>
      </View>
    );
  }
);

// Set display name for debugging
GoogleMap.displayName = "GoogleMap";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  map: {
    flex: 1,
  },
});

export default GoogleMap;
