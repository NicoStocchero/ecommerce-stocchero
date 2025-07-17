import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    // Acción unificada para login y signup exitoso
    authSuccess: (state, action) => {
      const { user, token, refreshToken } = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.user = user;
      // eslint-disable-next-line no-param-reassign
      state.token = token;
      // eslint-disable-next-line no-param-reassign
      state.refreshToken = refreshToken;
      // eslint-disable-next-line no-param-reassign
      state.isAuthenticated = true;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
    },
    // Acción unificada para login y signup fallido
    authFailure: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.user = null;
      // eslint-disable-next-line no-param-reassign
      state.token = null;
      // eslint-disable-next-line no-param-reassign
      state.refreshToken = null;
      // eslint-disable-next-line no-param-reassign
      state.isAuthenticated = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
    logout: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.user = null;
      // eslint-disable-next-line no-param-reassign
      state.token = null;
      // eslint-disable-next-line no-param-reassign
      state.refreshToken = null;
      // eslint-disable-next-line no-param-reassign
      state.isAuthenticated = false;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
    },
    clearError: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.error = null;
    },
    updateToken: (state, action) => {
      const { token, refreshToken } = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.token = token;
      // eslint-disable-next-line no-param-reassign
      state.refreshToken = refreshToken;
    },
  },
});

export const { authSuccess, authFailure, logout, clearError, updateToken } =
  authSlice.actions;

export default authSlice.reducer;
