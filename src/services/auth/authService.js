const AUTH_BASE_URL = process.env.EXPO_PUBLIC_AUTH_BASE_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const authService = {
  // Registrar nuevo usuario
  async signUp(email, password) {
    try {
      const response = await fetch(
        `${AUTH_BASE_URL}/accounts:signUp?key=${API_KEY}`,
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
        throw new Error(data.error?.message || "Error al registrar usuario");
      }

      return {
        success: true,
        user: {
          uid: data.localId,
          email: data.email,
          token: data.idToken,
          refreshToken: data.refreshToken,
          expiresIn: data.expiresIn,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Iniciar sesión
  async signIn(email, password) {
    try {
      const response = await fetch(
        `${AUTH_BASE_URL}/accounts:signInWithPassword?key=${API_KEY}`,
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
        throw new Error(data.error?.message || "Error al iniciar sesión");
      }

      return {
        success: true,
        user: {
          uid: data.localId,
          email: data.email,
          token: data.idToken,
          refreshToken: data.refreshToken,
          expiresIn: data.expiresIn,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Recuperar contraseña
  async resetPassword(email) {
    try {
      const response = await fetch(
        `${AUTH_BASE_URL}/accounts:sendOobCode?key=${API_KEY}`,
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
        throw new Error(
          data.error?.message || "Error al enviar email de recuperación"
        );
      }

      return {
        success: true,
        message: "Email de recuperación enviado",
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Refrescar token
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
        success: true,
        token: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};
