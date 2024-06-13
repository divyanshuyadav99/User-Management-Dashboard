import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
  signup_success: boolean;
  signin_success: boolean;
}

interface AuthPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
  signup_success: false,
  signin_success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    signInRequest(state, action: PayloadAction<AuthPayload>) {
      state.loading = true;
      state.error = null;
      state.signin_success = false;
    },
    signInSuccess(state, action: PayloadAction<AuthResponse>) {
      state.loading = false;
      state.token = action.payload.token;
      state.signin_success = true;
    },
    signInFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.signin_success = false;
    },
    nullifyBooleans(state) {
      state.signin_success = false;
      state.signup_success = false;
    },
    signUpRequest(state, action: PayloadAction<AuthPayload>) {
      state.loading = true;
      state.error = null;
      state.signup_success = false;
    },
    signUpSuccess(state, action: PayloadAction<AuthResponse>) {
      state.loading = false;
      state.token = action.payload.token;
      state.signup_success = true;
    },
    signUpFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.signup_success = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  signInRequest,
  signInSuccess,
  signInFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  nullifyBooleans,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
