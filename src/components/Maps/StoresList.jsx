/**
 * @fileoverview Stores list component for displaying store information.
 * Shows store details in a scrollable list format.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { StoreCard } from "../UI";
import colors from "../../global/colors";

/**
 * StoresList component props
 * @typedef {Object} StoresListProps
 * @property {Array} stores - Array of store objects
 * @property {Object|null} selectedStore - Currently selected store
 * @property {function} onStoreSelect - Callback when store is selected
 * @property {function} formatServices - Function to format services array
 */

/**
 * Stores list component for displaying store information
 * @param {StoresListProps} props - Component props
 * @returns {React.JSX.Element} Rendered stores list
 */
const StoresList = ({
  stores,
  selectedStore,
  onStoreSelect,
  formatServices,
}) => {
  const scrollViewHeight = selectedStore ? 400 : 300;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todas las tiendas</Text>
      <ScrollView
        style={[styles.scrollView, { maxHeight: scrollViewHeight }]}
        showsVerticalScrollIndicator={false}
      >
        {stores.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            onPress={() => onStoreSelect(store)}
            variant={selectedStore?.id === store.id ? "featured" : "compact"}
            selected={selectedStore?.id === store.id}
            formatServices={formatServices}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  scrollView: {
    // Height is set dynamically in the component
  },
});

export default StoresList;
