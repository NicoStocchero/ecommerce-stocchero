/**
 * @fileoverview Cart screen component for displaying and managing shopping cart items.
 * Shows cart items with quantities, prices, and provides cart management functionality.
 * @author Stocchero
 * @version 1.0.0
 */

import React, { useEffect, useRef } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../global/colors";
import {
  clearCart,
  removeItemFromCart,
  addItemToCart,
} from "../../features/cart/cartSlice";
import { useSQLite } from "../../hooks/useSQLite";
import { withErrorHandling } from "../../utils/errorHandler";
import { CartItem, CartSummary, CartEmpty } from "../../components/Cart";

/**
 * Cart screen component for displaying and managing shopping cart items.
 * Shows a list of cart items with images, quantities, prices, and subtotals.
 * Provides functionality to remove items, clear cart, and navigate to checkout.
 *
 * Features:
 * - Redux integration for cart state management
 * - Individual item display with images and details
 * - Quantity and subtotal calculations per item
 * - Remove individual items functionality
 * - Clear entire cart functionality
 * - Cart summary with totals
 * - Empty cart state handling
 * - Navigation to product details from cart items
 * - Checkout button (placeholder for future implementation)
 * - Responsive FlatList with optimized rendering
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.navigation - React Navigation object for screen navigation
 * @returns {React.JSX.Element} Rendered cart screen
 */
const Cart = ({ navigation }) => {
  // Redux hooks
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // SQLite hooks
  const {
    getCartItems,
    saveCartItem,
    removeCartItem: removeCartItemFromDB,
    clearCart: clearCartFromDB,
  } = useSQLite();

  // Ref to track if we're loading from DB to prevent sync loops
  const isLoadingFromDB = useRef(false);

  /**
   * Load cart items from SQLite on component mount
   */
  useEffect(() => {
    const loadCartFromDB = withErrorHandling(
      async () => {
        isLoadingFromDB.current = true;
        const dbCartItems = await getCartItems();
        if (dbCartItems.length > 0) {
          // Convert database items to Redux format and add to cart
          dbCartItems.forEach((item) => {
            dispatch(
              addItemToCart({
                id: item.product_id,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                mainImage: item.image,
                stock: 999, // Default stock for loaded items
              })
            );
          });
        }
      },
      "Cart.loadCartFromDB",
      { showAlert: false }
    );

    loadCartFromDB();
  }, [getCartItems, dispatch]);

  /**
   * Sync cart changes to SQLite (only when cart changes from user actions)
   */
  useEffect(() => {
    // Skip if we're loading from DB or if cart is empty
    if (isLoadingFromDB.current || cart.items.length === 0) return;

    const syncCartToDB = withErrorHandling(
      async () => {
        // Clear existing items and save current cart state
        await clearCartFromDB();

        // Save each cart item to database
        for (const item of cart.items) {
          await saveCartItem({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.mainImage,
          });
        }
      },
      "Cart.syncCartToDB",
      { showAlert: false }
    );

    // Add a small delay to prevent immediate sync after loading
    const timeoutId = setTimeout(() => {
      syncCartToDB();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [cart.items, saveCartItem, clearCartFromDB]);

  /**
   * Handles clearing all items from cart
   * Dispatches clearCart action to Redux store and clears SQLite
   */
  const handleClearCart = withErrorHandling(
    async () => {
      await clearCartFromDB();
      dispatch(clearCart());
    },
    "Cart.handleClearCart",
    { showAlert: false }
  );

  /**
   * Handles removing individual item from cart
   * @param {string} itemId - ID of item to remove from cart
   */
  const handleRemoveItem = withErrorHandling(
    async (itemId) => {
      await removeCartItemFromDB(itemId);
      dispatch(removeItemFromCart(itemId));
    },
    "Cart.handleRemoveItem",
    { showAlert: false }
  );

  /**
   * Renders individual cart item in the FlatList
   * Includes item image, details, quantity, and remove button
   * @param {Object} param - FlatList render item parameter
   * @param {Object} param.item - Cart item data
   * @returns {React.JSX.Element} Rendered cart item
   */
  const renderCartItem = ({ item }) => (
    <CartItem
      item={item}
      onPress={() => navigation.navigate("Tienda", { product: item })}
      onRemove={() => handleRemoveItem(item.id)}
    />
  );

  if (cart.items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart.items}
        renderItem={renderCartItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.summaryContainer}>
        <CartSummary
          totalPrice={cart.totalPrice}
          totalQuantity={cart.totalQuantity}
          onClearCart={handleClearCart}
          cartItems={cart.items}
        />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  listContainer: {
    paddingBottom: 20,
  },
  summaryContainer: {
    backgroundColor: colors.white,
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
  },
});
