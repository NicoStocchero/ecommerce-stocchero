import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../global/colors";

const Orders = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Mis Pedidos</Text>
    <Text style={styles.emptyText}>No tienes pedidos realizados</Text>
  </View>
);

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: colors.textPrimary || "#1a1a1a",
    marginBottom: 16,
  },
  emptyText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: colors.gray500 || "#999",
    textAlign: "center",
  },
});
