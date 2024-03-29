import { createAsyncThunk, createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import type {
  AutoLoginResponse,
  ErrorPayload,
  ForgotPasswordData,
  IUser,
  LoginData,
  LoginResponse,
  RegisterData,
  ResendVerificationData,
  ResetPasswordData,
  VerifyUserData,
} from '../@types';
import { apiService } from '../services';
import { getRefreshToken, setRefreshToken } from '../services/api.service';
import { updateProfile } from './profileSlice';
import { RootState } from './store';

export type AuthSliceData = {
  email: null | string;
  isAuthenticated: boolean;
  user: null | Partial<IUser>;
  registerErrors: unknown;
  loginErrors: unknown;
};

const initialState: AuthSliceData = {
  user: null,
  isAuthenticated: false,
  email: null,
  registerErrors: {},
  loginErrors: {},
};

export async function newCookie(refreshToken: string) {
  try {
    const res = await apiService.post('/auth/token', { refreshToken });
    return res.data;
  } catch (error: any | AxiosError) {
    return error;
  }
}

export const loginUser = createAsyncThunk('auth/loginUser', async (data: LoginData, { rejectWithValue }) => {
  try {
    const res = await apiService.post('/auth/login', data);
    setRefreshToken(res.data?.refreshToken);
    return res?.data;
  } catch (error: any | AxiosError) {
    const errors = error.response?.data?.errors;
    const extra = error.response?.data?.extra;
    const message = error?.response.data.message || 'Login error';
    return rejectWithValue({ errors, message, extra });
  }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (data: RegisterData, { rejectWithValue }) => {
  try {
    const res = await apiService.post('/auth/register', data);
    return res.data;
  } catch (error: any | AxiosError) {
    const errors = error.response?.data?.errors;
    const message = error?.response.data.message || 'Error creantig your account';
    return rejectWithValue({ errors, message });
  }
});

export const verifyUser = createAsyncThunk('auth/verifyUser', async (data: VerifyUserData, { rejectWithValue }) => {
  try {
    const res = await apiService.post('/auth/verifyUser', data);
    return res.data;
  } catch (error: any | AxiosError) {
    const errors = error.response?.data?.errors;
    const message = error?.response.data.message || 'Verification error';
    return rejectWithValue({ errors, message });
  }
});

export const resendVerificationLink = createAsyncThunk('auth/resendVerificationLink', async (data: ResendVerificationData, { rejectWithValue }) => {
  try {
    const res = await apiService.post('/auth/resendVerificationCode', data);
    return res.data;
  } catch (error: any | AxiosError) {
    const errors = error.response?.data?.errors;
    const message = error?.response.data.message || 'Error';
    return rejectWithValue({ errors, message });
  }
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (data: ForgotPasswordData, { rejectWithValue }) => {
  try {
    const res = await apiService.post('/auth/forgotPassword', data);
    return res.data;
  } catch (error: any | AxiosError) {
    const errors = error.response?.data?.errors;
    const message = error?.response.data.message || 'Error';
    return rejectWithValue({ errors, message });
  }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (data: ResetPasswordData, { rejectWithValue }) => {
  try {
    const res = await apiService.post('/auth/resetPassword', data);
    return res.data;
  } catch (error: any | AxiosError) {
    const errors = error.response?.data?.errors;
    const message = error?.response.data.message || 'Error';
    return rejectWithValue({ errors, message });
  }
});

export const autoLogin = createAsyncThunk('auth/autoLogin', async (_, { rejectWithValue }) => {
  try {
    const res = await apiService.get('/auth/me');
    return res.data;
  } catch (error: any | AxiosError) {
    const errors = error.response?.data?.errors;
    const message = error?.response.data.message || 'Error';
    return rejectWithValue({ errors, message });
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, { payload: { user } }: PayloadAction<{ user: null | IUser }>) => {
      state.user = user;
      state.isAuthenticated = true;
    },
  },
  extraReducers: {
    [registerUser.rejected.type]: (state, action: PayloadAction<ErrorPayload>) => {
      const { payload } = action;
      if (payload.errors) state.registerErrors = payload;
    },
    [loginUser.fulfilled.type]: (state, action: PayloadAction<LoginResponse>) => {
      const { payload } = action;
      state.user = payload.user;
      state.isAuthenticated = true;
    },
    [loginUser.rejected.type]: (state, action: PayloadAction<ErrorPayload>) => {
      const { payload } = action;
      if (payload?.errors) state.loginErrors = payload;
    },
    [autoLogin.fulfilled.type]: (state, action: PayloadAction<AutoLoginResponse>) => {
      const { payload } = action;
      state.user = payload.user;
      state.isAuthenticated = true;
    },
    [verifyUser.fulfilled.type]: (state, action: PayloadAction<LoginResponse>) => {
      const { payload } = action;
      state.isAuthenticated = true;
      state.user = payload.user;
    },
    [updateProfile.fulfilled.type]: (state, action: PayloadAction<{ user: IUser }>) => {
      const { payload } = action;
      state.user = payload.user;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
