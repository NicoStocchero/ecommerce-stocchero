/**
 * @fileoverview Search input component with focus states and icon.
 * Provides a styled search input with Ionicons search icon and focus feedback.
 * @author Stocchero
 * @version 1.0.0
 */

import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import colors from "../global/colors";

/**
 * Search component props
 * @typedef {Object} SearchProps
 * @property {string} keyword - Current search keyword value
 * @property {function} setKeyword - Function to update the search keyword
 */

/**
 * Search input component with icon and focus states.
 * Provides a styled text input with search icon and visual feedback on focus.
 * Updates search keyword in real-time as user types.
 *
 * @component
 * @param {SearchProps} props - Component props
 * @returns {React.JSX.Element} Rendered search input with icon
 *
 * @example
 * ```javascript
 * // Basic search usage
 * const [searchTerm, setSearchTerm] = useState("");
 *
 * <Search
 *   keyword={searchTerm}
 *   setKeyword={setSearchTerm}
 * />
 *
 * // With product filtering
 * const [keyword, setKeyword] = useState("");
 * const filteredProducts = products.filter(product =>
 *   product.title.toLowerCase().includes(keyword.toLowerCase())
 * );
 *
 * <Search keyword={keyword} setKeyword={setKeyword} />
 * ```
 */
const Search = ({ keyword, setKeyword }) => {
  const [isFocused, setIsFocused] = useState(false);

  const isActive = isFocused || keyword.length > 0;

  return (
    <View style={[styles.container, isActive && styles.containerFocused]}>
      <Ionicons
        name="search"
        size={20}
        color={isActive ? colors.primary : colors.gray600}
        style={styles.icon}
      />
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Buscar productos..."
        style={styles.input}
        placeholderTextColor={colors.gray500}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.gray300,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  containerFocused: {
    borderColor: colors.primary,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter_18pt-Regular",
    color: colors.textPrimary,
    letterSpacing: 0.2,
  },
});
