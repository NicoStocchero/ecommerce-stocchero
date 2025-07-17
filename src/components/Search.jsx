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
        color={colors.gray}
        style={styles.icon}
      />
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Buscar"
        style={styles.input}
        placeholderTextColor={colors.gray}
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
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 12,
  },
  containerFocused: {
    borderColor: colors.red,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
  },
});
