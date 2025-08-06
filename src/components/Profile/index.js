/**
 * @fileoverview Profile components module exports.
 * Provides reusable components for profile screens and user management.
 * @author Stocchero
 * @version 1.0.0
 */

/**
 * @module ProfileComponents
 * @description Collection of reusable profile UI components
 *
 * @example
 * ```javascript
 * import { ProfileHeader, ProfileSection, ProfileMenuItem } from '../components/Profile';
 *
 * // Use in profile screens
 * <ProfileHeader user={user} profileImage={image} onPressAvatar={handlePress} />
 * <ProfileSection title="Account">
 *   <ProfileMenuItem title="Edit Profile" onPress={handleEdit} />
 * </ProfileSection>
 * ```
 */

export { default as ProfileHeader } from "./ProfileHeader";
export { default as ProfileSection } from "./ProfileSection";
export { default as ProfileMenuItem } from "./ProfileMenuItem";
export { default as ProfileMenuCard } from "./ProfileMenuCard";
export { default as ProfileVersion } from "./ProfileVersion";
export { default as ProfileFormField } from "./ProfileFormField";
