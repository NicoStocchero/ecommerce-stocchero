import { createSlice } from "@reduxjs/toolkit";
import { authService } from "../../services/auth/authService";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
    },
    loginSuccess: (state, action) => {
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
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
    },
    loginFailure: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.user = null;
      // eslint-disable-next-line no-param-reassign
      state.token = null;
      // eslint-disable-next-line no-param-reassign
      state.refreshToken = null;
      // eslint-disable-next-line no-param-reassign
      state.isAuthenticated = false;
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
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
      state.isLoading = false;
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
    signUpStart: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
    },
    signUpSuccess: (state, action) => {
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
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
    },
    signUpFailure: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.user = null;
      // eslint-disable-next-line no-param-reassign
      state.token = null;
      // eslint-disable-next-line no-param-reassign
      state.refreshToken = null;
      // eslint-disable-next-line no-param-reassign
      state.isAuthenticated = false;
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  updateToken,
  signUpStart,
  signUpSuccess,
  signUpFailure,
} = authSlice.actions;

export default authSlice.reducer;

// Thunk actions
export const signUp = (credentials) => async (dispatch) => {
  try {
    dispatch(signUpStart());
    const result = await authService.signUp(
      credentials.email,
      credentials.password
    );
    dispatch(signUpSuccess(result));
  } catch (error) {
    dispatch(signUpFailure(error.message));
  }
};
