/**
 * @fileoverview Map controls component for location functionality.
 * Provides buttons for location and map fitting operations.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../global/colors";

/**
 * MapControls component props
 * @typedef {Object} MapControlsProps
 * @property {function} onMyLocation - Callback for my location button
 * @property {function} onFitAllStores - Callback for fit all stores button
 * @property {boolean} [showMyLocation=true] - Whether to show my location button
 * @property {boolean} [showFitAll=true] - Whether to show fit all stores button
 */

/**
 * Map controls component for location functionality
 * @param {MapControlsProps} props - Component props
 * @returns {React.JSX.Element} Rendered map controls
 */
const MapControls = ({
  onMyLocation,
  onFitAllStores,
  showMyLocation = true,
  showFitAll = true,
}) => (
  <View style={styles.controlsContainer}>
    {showMyLocation && (
      <Pressable style={styles.controlButton} onPress={onMyLocation}>
        <Ionicons name="locate" size={20} color={colors.white} />
      </Pressable>
    )}
    {showFitAll && (
      <Pressable style={styles.controlButton} onPress={onFitAllStores}>
        <Ionicons name="list" size={24} color={colors.white} />
      </Pressable>
    )}
  </View>
);

const styles = StyleSheet.create({
  controlsContainer: {
    position: "absolute",
    right: 16,
    top: 100,
    gap: 12,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default MapControls;
