import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { Image } from "expo-image";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../global/colors";
import { clearCart, removeItemFromCart } from "../../features/cart/cartSlice";
import FlatCard from "../../components/FlatCard";

const CartSummary = ({ totalPrice, totalQuantity, onClearCart }) => (
  <View style={styles.summaryContainer}>
    <FlatCard style={styles.summaryCard}>
      <View style={styles.summaryContent}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Items</Text>
          <Text style={styles.summaryValue}>{totalQuantity}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${totalPrice.toLocaleString()}</Text>
        </View>
      </View>
    </FlatCard>

    <Pressable style={styles.checkoutButton}>
      <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
    </Pressable>

    <Pressable style={styles.clearButton} onPress={onClearCart}>
      <Text style={styles.clearButtonText}>Vaciar Carrito</Text>
    </Pressable>
  </View>
);

const Cart = ({ navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  const renderCartItem = ({ item }) => (
    <FlatCard style={styles.cartItem}>
      <Pressable
        onPress={() => navigation.navigate("Tienda", { product: item })}
      >
        <Image
          source={item.mainImage}
          style={styles.itemImage}
          contentFit="cover"
          transition={300}
          cachePolicy="memory-disk"
        />
      </Pressable>
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Pressable
            style={styles.removeButton}
            onPress={() => handleRemoveItem(item.id)}
          >
            <Text style={styles.removeButtonText}>✕</Text>
          </Pressable>
        </View>

        <View style={styles.itemDetails}>
          <Text style={styles.itemPrice}>${item.price.toLocaleString()}</Text>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Cantidad:</Text>
            <View style={styles.quantityBadge}>
              <Text style={styles.quantityText}>{item.quantity}</Text>
            </View>
          </View>
        </View>

        <View style={styles.itemFooter}>
          <Text style={styles.subtotalLabel}>Subtotal</Text>
          <Text style={styles.subtotalValue}>
            ${(item.price * item.quantity).toLocaleString()}
          </Text>
        </View>
      </View>
    </FlatCard>
  );

  const footerComponent = (
    <CartSummary
      totalPrice={cart.totalPrice}
      totalQuantity={cart.totalQuantity}
      onClearCart={handleClearCart}
    />
  );

  if (cart.items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
        <Text style={styles.emptyText}>
          Agrega productos para comenzar tu compra
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart.items}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={footerComponent}
      />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: colors.gray900,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: colors.gray,
    textAlign: "center",
    lineHeight: 22,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: 16,
    marginBottom: 16,
    borderRadius: 20,
    gap: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: colors.gray100,
  },
  itemContent: {
    flex: 1,
    gap: 12,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemTitle: {
    flex: 1,
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: colors.gray900,
    lineHeight: 20,
    marginRight: 12,
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.error,
    alignItems: "center",
    justifyContent: "center",
  },
  removeButtonText: {
    fontFamily: "Inter-Bold",
    fontSize: 12,
    color: colors.white,
  },
  itemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPrice: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: colors.success,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quantityLabel: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: colors.gray,
  },
  quantityBadge: {
    backgroundColor: colors.black,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    minWidth: 32,
    alignItems: "center",
  },
  quantityText: {
    fontFamily: "Inter-Bold",
    fontSize: 14,
    color: colors.white,
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
  },
  subtotalLabel: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: colors.gray,
  },
  subtotalValue: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    color: colors.gray900,
  },
  summaryContainer: {
    marginTop: 24,
    gap: 16,
  },
  summaryCard: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  summaryContent: {
    gap: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: colors.gray,
  },
  summaryValue: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: colors.gray900,
  },
  totalLabel: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
    color: colors.gray900,
  },
  totalValue: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: colors.success,
  },
  checkoutButton: {
    backgroundColor: colors.black,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  checkoutButtonText: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    color: colors.white,
    textTransform: "uppercase",
  },
  clearButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  clearButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: colors.error,
    textDecorationLine: "underline",
  },
});
