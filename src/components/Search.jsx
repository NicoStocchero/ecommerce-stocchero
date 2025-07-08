import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { colors } from "../global/colors";

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
