/**
 * @fileoverview Authentication components module exports.
 * Provides reusable components for authentication forms including inputs, buttons,
 * error messages, and UI dividers.
 * @author Stocchero
 * @version 1.0.0
 */

/**
 * @module AuthComponents
 * @description Collection of reusable authentication UI components
 *
 * @example
 * ```javascript
 * import { FormInput, AuthButton, ErrorMessage, AuthDivider } from '../components/Auth';
 *
 * // Use in login/signup forms
 * <FormInput label="Email" ... />
 * <AuthButton title="Login" ... />
 * <ErrorMessage message={error} />
 * <AuthDivider />
 * ```
 */

export { default as AuthButton } from "./AuthButton";
export { default as AuthDivider } from "./AuthDivider";
export { default as ErrorMessage } from "./ErrorMessage";
export { default as FormInput } from "./FormInput";
export { default as PasswordRequirements } from "./PasswordRequirements";
