// src/utils/firebaseErrorMessage.js
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
