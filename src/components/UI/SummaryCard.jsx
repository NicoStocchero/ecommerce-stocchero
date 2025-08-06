/**
 * @fileoverview Modern summary card component for displaying key information.
 * Displays summary information in a clean, consistent format.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../global/colors";

/**
 * SummaryCard component props
 * @typedef {Object} SummaryCardProps
 * @property {Array} rows - Array of row objects with label and value
 * @property {Object} [totalRow] - Total row with label and value
 * @property {Object} [style] - Additional styles to apply
 */

/**
 * Modern summary card component
 * @param {SummaryCardProps} props - Component props
 * @returns {React.JSX.Element} Rendered summary card
 */
const SummaryCard = ({ rows = [], totalRow, style }) => {
  return (
    <View style={[styles.container, style]}>
      {rows.map((row, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.label}>{row.label}</Text>
          <Text style={styles.value}>{row.value}</Text>
        </View>
      ))}

      {totalRow && (
        <>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>{totalRow.label}</Text>
            <Text style={styles.totalValue}>{totalRow.value}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.gray100,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 16,
    color: colors.gray600,
    letterSpacing: 0.3,
  },
  value: {
    fontFamily: "Inter_18pt-SemiBold",
    fontSize: 16,
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray100,
    marginBottom: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontFamily: "Inter_18pt-Bold",
    fontSize: 20,
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  totalValue: {
    fontFamily: "Inter_18pt-Bold",
    fontSize: 24,
    color: colors.success,
    letterSpacing: 0.3,
  },
});

export default SummaryCard;
