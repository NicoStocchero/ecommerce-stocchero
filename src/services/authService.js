const AUTH_BASE_URL = process.env.EXPO_PUBLIC_AUTH_BASE_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const authService = {
  async signIn(email, password) {
    try {
      const response = await fetch(
        `${AUTH_BASE_URL}accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = "Error en el login";
        if (data.error) {
          switch (data.error.message) {
            case "EMAIL_NOT_FOUND":
              errorMessage = "Email no encontrado";
              break;
            case "INVALID_PASSWORD":
              errorMessage = "Contraseña incorrecta";
              break;
            case "USER_DISABLED":
              errorMessage = "Usuario deshabilitado";
              break;
            case "INVALID_LOGIN_CREDENTIALS":
              errorMessage = "Credenciales inválidas";
              break;
            default:
              errorMessage = data.error.message;
          }
        }
        throw new Error(errorMessage);
      }

      return {
        user: {
          email: data.email,
          localId: data.localId,
        },
        token: data.idToken,
        refreshToken: data.refreshToken,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async signUp(email, password) {
    try {
      const response = await fetch(
        `${AUTH_BASE_URL}accounts:signUp?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = "Error en el registro";
        if (data.error) {
          switch (data.error.message) {
            case "EMAIL_EXISTS":
              errorMessage = "El email ya está registrado";
              break;
            case "OPERATION_NOT_ALLOWED":
              errorMessage = "Operación no permitida";
              break;
            case "TOO_MANY_ATTEMPTS_TRY_LATER":
              errorMessage = "Demasiados intentos, intenta más tarde";
              break;
            case "WEAK_PASSWORD":
              errorMessage = "La contraseña es muy débil";
              break;
            default:
              errorMessage = data.error.message;
          }
        }
        throw new Error(errorMessage);
      }

      return {
        user: {
          email: data.email,
          localId: data.localId,
        },
        token: data.idToken,
        refreshToken: data.refreshToken,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async resetPassword(email) {
    try {
      const response = await fetch(
        `${AUTH_BASE_URL}accounts:sendOobCode?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = "Error al enviar el email";
        if (data.error) {
          switch (data.error.message) {
            case "EMAIL_NOT_FOUND":
              errorMessage = "Email no encontrado";
              break;
            case "INVALID_EMAIL":
              errorMessage = "Email inválido";
              break;
            default:
              errorMessage = data.error.message;
          }
        }
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async refreshToken(refreshToken) {
    try {
      const response = await fetch(
        `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Error al refrescar token");
      }

      return {
        token: data.id_token,
        refreshToken: data.refresh_token,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
