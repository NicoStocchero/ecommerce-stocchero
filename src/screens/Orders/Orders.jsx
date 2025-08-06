/**
 * @fileoverview Orders screen component for displaying user order history.
 * Loads and displays orders from Firebase using ordersApi.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { EmptyState, OrderCard } from "../../components/UI";
import Loading from "../../components/Loading";
import { useGetOrdersQuery } from "../../services";
import { colors } from "../../global/colors";
import { useAuthToken } from "../../hooks";

/**
 * Orders screen component with Firebase integration
 * @returns {React.JSX.Element} Rendered orders screen
 */
const Orders = () => {
  const { session, freshToken, isLoading: authLoading } = useAuthToken();

  const {
    data: orders = [],
    isLoading: ordersLoading,
    error,
  } = useGetOrdersQuery(
    {
      userId: session?.local_id,
      token: freshToken,
    },
    {
      skip: !session?.local_id || !freshToken,
    }
  );

  if (authLoading || ordersLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <EmptyState
        title="Error al cargar pedidos"
        message="No pudimos cargar tu historial de pedidos. Intenta nuevamente."
        icon="alert-circle-outline"
        variant="error"
      />
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        title="No tienes pedidos realizados"
        message="Cuando realices tu primera compra, aquí podrás ver el historial de tus pedidos"
        icon="receipt-outline"
        variant="orders"
      />
    );
  }

  const renderOrder = ({ item }) => <OrderCard order={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
    gap: 16,
  },
});

export default Orders;
