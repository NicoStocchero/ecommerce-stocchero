/**
 * @fileoverview Edit profile screen component for updating user profile information.
 * Provides a form interface for users to update their personal information.
 * @author Stocchero
 * @version 1.0.0
 */

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData, setProfileError } from "../../features/user/userSlice";
import {
  useUpdateProfileDataMutation,
  useGetProfileDataQuery,
} from "../../services/profile/profileApi";
import { useAuthToken } from "../../hooks";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "../../components/UI";
import { ProfileFormField } from "../../components/Profile";
import {
  profileInfoSchema,
  profileFieldsConfig,
  defaultProfileData,
} from "../../schemas/profileSchema";
import colors from "../../global/colors";
import { handleError, withErrorHandling } from "../../utils/errorHandler";

/**
 * EditProfile screen component
 * @param {Object} props - Component props
 * @param {Object} props.navigation - React Navigation object
 * @returns {React.JSX.Element} Rendered edit profile screen
 */
const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    session,
    freshToken,
    isLoading: authLoading,
    error: authError,
  } = useAuthToken();
  const { user, profileData } = useSelector((state) => state.user);

  // Form state
  const [formData, setFormData] = useState(defaultProfileData);
  const [originalData, setOriginalData] = useState(defaultProfileData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // RTK Query hooks
  const {
    data: fetchedProfileData,
    isLoading: isFetching,
    error: fetchError,
  } = useGetProfileDataQuery(
    { userId: session?.local_id, authToken: freshToken },
    { skip: !session?.local_id || !freshToken }
  );

  const [updateProfileData, { isLoading: isUpdating }] =
    useUpdateProfileDataMutation();

  /**
   * Load existing profile data on component mount
   */
  useEffect(() => {
    if (fetchedProfileData) {
      const mergedData = {
        ...defaultProfileData,
        ...profileData,
        ...fetchedProfileData,
      };
      setFormData(mergedData);
      setOriginalData(mergedData);
    } else if (profileData) {
      const mergedData = {
        ...defaultProfileData,
        ...profileData,
      };
      setFormData(mergedData);
      setOriginalData(mergedData);
    }
  }, [fetchedProfileData, profileData]);

  /**
   * Handle form field changes
   */
  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  /**
   * Check if form has changes compared to original data
   */
  const hasChanges = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(originalData);
  }, [formData, originalData]);

  /**
   * Validate form data using Zod schema
   */
  const validateForm = () => {
    try {
      profileInfoSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      const newErrors = {};
      error.errors.forEach((err) => {
        const field = err.path[0];
        newErrors[field] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  /**
   * Handle form submission
   */
  const handleSave = withErrorHandling(
    async () => {
      // Check authentication first
      if (!session?.local_id || !freshToken) {
        Alert.alert(
          "Error de Autenticación",
          "No se pudo verificar tu identidad. Por favor, inicia sesión nuevamente."
        );
        return;
      }

      if (!validateForm()) {
        Alert.alert("Error", "Por favor corrige los errores en el formulario");
        return;
      }

      setIsLoading(true);

      try {
        // Update profile data in Firebase
        const response = await updateProfileData({
          userId: session.local_id,
          data: formData,
          authToken: freshToken,
        }).unwrap();

        // RTK Query mutations return the data directly
        if (response) {
          // Update Redux store
          dispatch(setProfileData(formData));

          Alert.alert(
            "Perfil Actualizado",
            "Tu información personal ha sido guardada exitosamente",
            [
              {
                text: "OK",
                onPress: () => navigation.goBack(),
              },
            ]
          );
        } else {
          throw new Error("Invalid response structure from API");
        }
      } catch (error) {
        dispatch(
          setProfileError({
            message: "Error al actualizar el perfil",
            type: "PROFILE_UPDATE",
          })
        );
        Alert.alert(
          "Error",
          "No se pudo actualizar el perfil. Intenta de nuevo."
        );
      } finally {
        setIsLoading(false);
      }
    },
    "EditProfile.handleSave",
    { showAlert: false }
  );

  /**
   * Handle cancel action
   */
  const handleCancel = () => {
    if (hasChanges) {
      Alert.alert(
        "Descartar Cambios",
        "¿Estás seguro de que quieres descartar los cambios?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Descartar",
            style: "destructive",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  // Show loading state
  if (authLoading || isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          {authLoading
            ? "Verificando autenticación..."
            : "Cargando información del perfil..."}
        </Text>
      </View>
    );
  }

  // Show auth error state
  if (authError) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Error de autenticación. Por favor, inicia sesión nuevamente.
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>Editar Perfil</Text>
          <Text style={styles.subtitle}>
            Actualiza tu información personal para una mejor experiencia
          </Text>
          {hasChanges && (
            <Button
              title="Guardar Cambios"
              onPress={handleSave}
              loading={isLoading || isUpdating}
              disabled={isLoading || isUpdating}
              style={styles.saveButtonTop}
            />
          )}
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          {profileFieldsConfig.map((fieldConfig) => (
            <ProfileFormField
              key={fieldConfig.key}
              label={fieldConfig.label}
              value={formData[fieldConfig.key] || ""}
              onChangeText={(value) =>
                handleFieldChange(fieldConfig.key, value)
              }
              placeholder={fieldConfig.placeholder}
              type={fieldConfig.type}
              required={fieldConfig.required}
              maxLength={fieldConfig.maxLength}
              icon={fieldConfig.icon}
              error={errors[fieldConfig.key]}
            />
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          <Button
            title="Cancelar"
            onPress={handleCancel}
            variant="outline"
            disabled={isLoading || isUpdating}
            style={styles.cancelButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray50,
  },
  loadingText: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 16,
    color: colors.gray600,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerSection: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  title: {
    fontFamily: "Inter_18pt-Bold",
    fontSize: 24,
    color: colors.textPrimary,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 15,
    color: colors.gray600,
    letterSpacing: 0.2,
    lineHeight: 22,
  },
  formSection: {
    backgroundColor: colors.white,
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  buttonSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 12,
  },
  saveButtonTop: {
    marginTop: 16,
    marginBottom: 0,
  },
  cancelButton: {
    marginBottom: 0,
  },
});

export default EditProfile;
