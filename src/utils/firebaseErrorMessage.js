/**
 * @fileoverview Firebase error message utility for translating Firebase error codes
 * to user-friendly Spanish messages.
 * @author Stocchero
 * @version 1.0.0
 */

/**
 * Translates Firebase authentication error codes to user-friendly Spanish messages.
 * Handles common Firebase errors and provides context-specific messages for login vs signup.
 *
 * @param {Object|string} error - Firebase error object or error code string
 * @param {Object} [error.data] - Error data container
 * @param {Object} [error.data.error] - Firebase error details
 * @param {string} [error.data.error.message] - Firebase error code
 * @param {string} [context="login"] - Context of the operation ("login" or "signup")
 * @returns {string} User-friendly error message in Spanish
 *
 * @example
 * ```javascript
 * // Handle login error
 * const errorMsg = getFirebaseErrorMessage(firebaseError, "login");
 * // Returns: "Email o contraseña incorrectos. Intentá nuevamente."
 *
 * // Handle signup error
 * const signupMsg = getFirebaseErrorMessage(firebaseError, "signup");
 * // Returns: "Este email ya está registrado"
 * ```
 */
export function getFirebaseErrorMessage(error, context = "login") {
  const firebaseError = error?.data?.error?.message || error;
  switch (firebaseError) {
    case "INVALID_LOGIN_CREDENTIALS":
    case "INVALID_PASSWORD":
    case "EMAIL_NOT_FOUND":
      return "Email o contraseña incorrectos. Intentá nuevamente.";
    case "EMAIL_EXISTS":
      return "Este email ya está registrado";
    case "WEAK_PASSWORD":
      return "La contraseña es muy débil (mínimo 6 caracteres)";
    case "OPERATION_NOT_ALLOWED":
      return "El registro no está habilitado en este momento";
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      return "Demasiados intentos. Intenta más tarde.";
    default:
      return context === "signup"
        ? "Error en el registro. Intenta nuevamente."
        : "Error de inicio de sesión. Intenta nuevamente.";
  }
}
