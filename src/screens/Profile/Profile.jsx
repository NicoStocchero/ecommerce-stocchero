/**
 * @fileoverview Profile screen component for displaying and managing user profile information.
 * Uses the modern UI system with consistent design.
 * @author Stocchero
 * @version 1.0.0
 */

import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user/userSlice";
import {
  updateProfileImage,
  resetProfile,
  setProfileData,
} from "../../features/user/userSlice";
import colors from "../../global/colors";
import { useSQLite } from "../../hooks/useSQLite";
import { handleError, withErrorHandling } from "../../utils/errorHandler";
import { useProfileImage } from "../../hooks/useProfileImage";
import { useProfileNavigation } from "../../hooks/useProfileNavigation";
import { useSession } from "../../hooks/useSession";
import { useAuthToken } from "../../hooks";
import { useGetProfileDataQuery } from "../../services/profile/profileApi";

import {
  ProfileHeader,
  ProfileSection,
  ProfileMenuItem,
  ProfileMenuCard,
  ProfileVersion,
} from "../../components/Profile";

/**
 * Profile screen component
 * @param {Object} props - Component props
 * @param {Object} props.navigation - React Navigation object
 * @returns {React.JSX.Element} Rendered profile screen
 */
const Profile = ({ navigation }) => {
  const { session, freshToken } = useAuthToken();
  const dispatch = useDispatch();
  const { user, isAuthenticated, profileImage, isUpdatingImage, profileData } =
    useSelector((state) => state.user);

  // Fetch profile data from Firebase
  const { data: fetchedProfileData, isLoading: isLoadingProfile } =
    useGetProfileDataQuery(
      { userId: session?.local_id, authToken: freshToken },
      { skip: !session?.local_id || !freshToken }
    );

  // SQLite hooks
  const { getSession } = useSQLite();

  // Use custom hooks for profile functionality
  const { selectImage } = useProfileImage();
  const {
    handleEditProfile,
    handleChangePassword,
    handleAppSettings,
    handleOrderHistory,
    handleHelpSupport,
  } = useProfileNavigation(navigation);
  const { handleLogout: sessionHandleLogout } = useSession();

  /**
   * Load profile image from database on component mount
   */
  useEffect(() => {
    const loadProfileImage = withErrorHandling(
      async () => {
        try {
          if (session?.local_id && freshToken) {
            try {
              const firebaseUrl = `${process.env.EXPO_PUBLIC_BASE_RTDB_URL}/users/${session.local_id}/profile.json?auth=${freshToken}`;
              const response = await fetch(firebaseUrl);
              const firebaseData = await response.json();
              if (firebaseData && firebaseData.profileImage) {
                dispatch(updateProfileImage(firebaseData.profileImage));
                return;
              }
            } catch (firebaseError) {
              // Silent fallback to SQLite
            }
          }
          if (session && session.profile_image) {
            dispatch(updateProfileImage(session.profile_image));
          }
        } catch (error) {
          // Silent error handling
        }
      },
      "Profile.loadProfileImage",
      { showAlert: false }
    );
    loadProfileImage();
  }, [session, freshToken, dispatch]);

  /**
   * Update Redux store when profile data is fetched
   */
  useEffect(() => {
    if (fetchedProfileData && Object.keys(fetchedProfileData).length > 0) {
      dispatch(setProfileData(fetchedProfileData));
    }
  }, [fetchedProfileData, dispatch]);

  // Merge profile data from different sources
  const mergedProfileData = {
    ...profileData,
    ...fetchedProfileData,
  };

  /**
   * Handles profile image change with image picker
   * Shows alert to choose between camera or gallery
   */
  const handleChangeProfileImage = () => {
    Alert.alert("Cambiar Foto de Perfil", "Selecciona una opción", [
      {
        text: "Cámara",
        onPress: () => selectImageFromSource("camera"),
      },
      {
        text: "Galería",
        onPress: () => selectImageFromSource("gallery"),
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ]);
  };

  /**
   * Selects image from specified source
   */
  const selectImageFromSource = withErrorHandling(
    async (source) => {
      await selectImage(source);
    },
    "Profile.selectImageFromSource",
    { showAlert: false }
  );

  /**
   * Handles user logout with confirmation
   */
  const handleLogout = () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro de que quieres salir?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Cerrar Sesión",
        style: "destructive",
        onPress: async () => {
          try {
            await sessionHandleLogout();
            dispatch(resetProfile());
            dispatch(logout());
          } catch (error) {
            handleError(error, "Profile.handleLogout");
          }
        },
      },
    ]);
  };

  // Show loading or error state if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons
            name="person-circle-outline"
            size={64}
            color={colors.gray400}
          />
          <Text style={styles.errorText}>No se pudo cargar el perfil</Text>
          <Text style={styles.errorSubtext}>
            Inicia sesión para ver tu perfil
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info Section */}
        <ProfileHeader
          user={user}
          profileImage={profileImage}
          isUpdatingImage={isUpdatingImage}
          onPressAvatar={handleChangeProfileImage}
          profileData={mergedProfileData}
        />

        {/* Account Management Section */}
        <ProfileSection title="Gestión de Cuenta">
          <ProfileMenuCard>
            <ProfileMenuItem
              title="Editar Perfil"
              subtitle="Modificar información personal"
              onPress={handleEditProfile}
            />
            <View style={styles.divider} />
            <ProfileMenuItem
              title="Cambiar Contraseña"
              subtitle="Actualizar contraseña de seguridad"
              onPress={handleChangePassword}
            />
          </ProfileMenuCard>
        </ProfileSection>

        {/* App Features Section */}
        <ProfileSection title="Funciones de la App">
          <ProfileMenuCard>
            <ProfileMenuItem
              title="Mis Pedidos"
              subtitle="Ver historial de compras"
              onPress={handleOrderHistory}
            />
            <View style={styles.divider} />
            <ProfileMenuItem
              title="Configuración"
              subtitle="Preferencias de la aplicación"
              onPress={handleAppSettings}
            />
            <View style={styles.divider} />
            <ProfileMenuItem
              title="Ayuda y Soporte"
              subtitle="Contactar soporte técnico"
              onPress={handleHelpSupport}
            />
          </ProfileMenuCard>
        </ProfileSection>

        {/* Logout Section */}
        <ProfileSection title="Sesión">
          <ProfileMenuCard>
            <ProfileMenuItem
              title="Cerrar Sesión"
              subtitle="Salir de tu cuenta"
              onPress={handleLogout}
              isDestructive={true}
            />
          </ProfileMenuCard>
        </ProfileSection>

        {/* App Version Info */}
        <ProfileVersion />
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
    gap: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    gap: 16,
  },
  errorText: {
    fontFamily: "Inter_18pt-SemiBold",
    fontSize: 18,
    color: colors.textPrimary,
    textAlign: "center",
    letterSpacing: 0.3,
  },
  errorSubtext: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 14,
    color: colors.gray600,
    textAlign: "center",
    letterSpacing: 0.2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray200,
    marginHorizontal: 20,
  },
});
