/**
 * @fileoverview Profile form field component for dynamic form generation.
 * Provides a reusable form field component with consistent styling and validation.
 * @author Stocchero
 * @version 1.0.0
 */

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../global/colors";
import DateTimePicker from "@react-native-community/datetimepicker";

/**
 * ProfileFormField component props
 * @typedef {Object} ProfileFormFieldProps
 * @property {string} label - Field label
 * @property {string} value - Current field value
 * @property {function} onChangeText - Text change handler
 * @property {string} [placeholder] - Input placeholder text
 * @property {string} [type="text"] - Field type (text, phone, date, multiline, url)
 * @property {boolean} [required=false] - Whether field is required
 * @property {number} [maxLength] - Maximum character length
 * @property {string} [icon] - Ionicons name for field icon
 * @property {string} [error] - Error message to display
 * @property {boolean} [editable=true] - Whether field is editable
 */

/**
 * Profile form field component for dynamic form generation.
 * Provides consistent styling and behavior for different field types.
 *
 * @component
 * @param {ProfileFormFieldProps} props - Component props
 * @returns {React.JSX.Element} Rendered profile form field
 *
 * @example
 * ```javascript
 * <ProfileFormField
 *   label="Nombre Completo"
 *   value={displayName}
 *   onChangeText={setDisplayName}
 *   placeholder="Ingresa tu nombre completo"
 *   type="text"
 *   required={true}
 *   maxLength={50}
 *   icon="person-outline"
 *   error={errors.displayName}
 * />
 * ```
 */
const ProfileFormField = ({
  label,
  value,
  onChangeText,
  placeholder,
  type = "text",
  required = false,
  maxLength,
  icon,
  error,
  editable = true,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  /**
   * Gets keyboard type based on field type
   */
  const getKeyboardType = () => {
    switch (type) {
      case "phone":
        return "phone-pad";
      case "url":
        return "url";
      default:
        return "default";
    }
  };

  /**
   * Handles date selection from DateTimePicker
   */
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate && event.type === "set") {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      onChangeText(formattedDate);
    }
  };

  /**
   * Formats date for display
   */
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR");
  };

  /**
   * Shows date picker for date fields
   */
  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.fieldContainer}>
      {/* Field Label */}
      <View style={styles.labelContainer}>
        {icon && (
          <Ionicons
            name={icon}
            size={16}
            color={colors.gray600}
            style={styles.labelIcon}
          />
        )}
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      </View>

      {/* Input Field */}
      {type === "date" ? (
        <Pressable
          onPress={editable ? showDatePickerModal : undefined}
          style={[
            styles.inputContainer,
            !editable && styles.disabledInput,
            error && styles.errorInput,
          ]}
        >
          <Text style={[styles.dateText, !value && styles.placeholderText]}>
            {value ? formatDateForDisplay(value) : placeholder}
          </Text>
          <Ionicons name="calendar-outline" size={20} color={colors.gray400} />
        </Pressable>
      ) : (
        <View
          style={[
            styles.inputContainer,
            !editable && styles.disabledInput,
            error && styles.errorInput,
          ]}
        >
          <TextInput
            style={[
              styles.textInput,
              type === "multiline" && styles.multilineInput,
            ]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.gray400}
            keyboardType={type === "phone" ? "phone-pad" : "default"}
            maxLength={maxLength}
            multiline={type === "multiline"}
            numberOfLines={type === "multiline" ? 4 : 1}
            textAlignVertical={type === "multiline" ? "top" : "center"}
            editable={editable}
            autoCapitalize={type === "url" ? "none" : "words"}
            autoCorrect={false}
            spellCheck={false}
            autoComplete="off"
            selectTextOnFocus={false}
            clearButtonMode="while-editing"
            textContentType="none"
            returnKeyType="next"
            blurOnSubmit={false}
          />
        </View>
      )}

      {/* Character Counter */}
      {maxLength && value && (
        <Text style={styles.characterCounter}>
          {value.length}/{maxLength}
        </Text>
      )}

      {/* Error Message */}
      {error && (
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={14}
            color={colors.error}
            style={styles.errorIcon}
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  labelIcon: {
    marginRight: 6,
  },
  label: {
    fontFamily: "Inter_18pt-SemiBold",
    fontSize: 14,
    color: colors.textPrimary,
    letterSpacing: 0.2,
  },
  required: {
    color: colors.error,
    fontWeight: "bold",
  },
  inputContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray200,
    minHeight: 48,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  disabledInput: {
    backgroundColor: colors.gray50,
    opacity: 0.6,
  },
  errorInput: {
    borderColor: colors.error,
    backgroundColor: "#FEF2F2",
  },
  textInput: {
    flex: 1,
    fontFamily: "Inter_18pt-Regular",
    fontSize: 15,
    color: colors.textPrimary,
    letterSpacing: 0.2,
    paddingVertical: 12,
  },
  multilineInput: {
    minHeight: 80,
    maxHeight: 120,
    paddingTop: 12,
    paddingBottom: 12,
  },
  dateText: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 15,
    color: colors.textPrimary,
    letterSpacing: 0.2,
    flex: 1,
  },
  placeholderText: {
    color: colors.gray400,
  },
  characterCounter: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 12,
    color: colors.gray500,
    textAlign: "right",
    marginTop: 4,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    paddingHorizontal: 4,
  },
  errorIcon: {
    marginRight: 6,
  },
  errorText: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 13,
    color: colors.error,
    flex: 1,
    letterSpacing: 0.2,
  },
});

export default ProfileFormField;
