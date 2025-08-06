/**
 * @fileoverview Profile header component for displaying user avatar and basic information.
 * Handles profile image display, avatar interaction, and user details.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../global/colors";

/**
 * ProfileHeader component props
 * @typedef {Object} ProfileHeaderProps
 * @property {Object} user - User data object
 * @property {string|null} profileImage - Profile image URI
 * @property {boolean} isUpdatingImage - Loading state for image updates
 * @property {function} onPressAvatar - Callback when avatar is pressed
 * @property {Object|null} profileData - Additional profile data
 */

/**
 * Profile header component for displaying user avatar and basic information.
 * Shows user's profile image with fallback to initials, loading state, and camera icon.
 *
 * @component
 * @param {ProfileHeaderProps} props - Component props
 * @returns {React.JSX.Element} Rendered profile header
 *
 * @example
 * ```javascript
 * <ProfileHeader
 *   user={user}
 *   profileImage={profileImage}
 *   isUpdatingImage={isUpdatingImage}
 *   onPressAvatar={handleChangeProfileImage}
 * />
 * ```
 */
const ProfileHeader = ({
  user,
  profileImage,
  isUpdatingImage,
  onPressAvatar,
  profileData,
}) => {
  /**
   * Gets user initials from email for fallback avatar
   * @param {string} email - User's email address
   * @returns {string} User initials or 'U' as fallback
   */
  const getUserInitials = (email) => {
    if (!email) return "U";
    return email.charAt(0).toUpperCase();
  };

  /**
   * Gets display name from profile data or email
   * @param {string} email - User's email address
   * @returns {string} Display name or email username
   */
  const getDisplayName = (email) => {
    if (profileData?.displayName) return profileData.displayName;
    if (!email) return "Usuario";
    return email.split("@")[0];
  };

  return (
    <View style={styles.headerSection}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarSection}>
          <Pressable
            onPress={onPressAvatar}
            style={styles.avatarContainer}
            accessibilityLabel="Cambiar foto de perfil"
            accessibilityHint="Toca para cambiar tu foto de perfil"
          >
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
                contentFit="cover"
                transition={300}
                cachePolicy="memory-disk"
              />
            ) : (
              <View style={styles.defaultAvatar}>
                <Text style={styles.avatarText}>
                  {getUserInitials(user?.email)}
                </Text>
              </View>
            )}

            {/* Camera Icon Overlay */}
            <View style={styles.cameraIconContainer}>
              <View style={styles.cameraIcon}>
                <Ionicons name="camera" size={12} color={colors.white} />
              </View>
            </View>

            {/* Loading Overlay */}
            {isUpdatingImage && (
              <View style={styles.loadingOverlay}>
                <View style={styles.loadingSpinner}>
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={20}
                    color={colors.primary}
                  />
                </View>
              </View>
            )}
          </Pressable>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{getDisplayName(user?.email)}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          {profileData?.occupation && (
            <Text style={styles.userOccupation}>{profileData.occupation}</Text>
          )}
          <View style={styles.statusContainer}>
            <View style={styles.statusDot} />
            <Text style={styles.userStatus}>Cuenta activa</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    backgroundColor: colors.white,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  avatarSection: {
    position: "relative",
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.gray100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.gray200,
  },
  defaultAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: "Inter_18pt-Bold",
    fontSize: 32,
    color: colors.white,
    letterSpacing: 0.5,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 3,
    borderWidth: 1,
    borderColor: colors.gray200,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cameraIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.textPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingSpinner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  userInfo: {
    flex: 1,
    gap: 6,
  },
  userName: {
    fontFamily: "Inter_18pt-Bold",
    fontSize: 20,
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  userEmail: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 14,
    color: colors.gray600,
    letterSpacing: 0.2,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  userStatus: {
    fontFamily: "Inter_18pt-SemiBold",
    fontSize: 13,
    color: colors.success,
    letterSpacing: 0.3,
  },
  userOccupation: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 13,
    color: colors.gray500,
    letterSpacing: 0.2,
    fontStyle: "italic",
  },
});

export default ProfileHeader;
