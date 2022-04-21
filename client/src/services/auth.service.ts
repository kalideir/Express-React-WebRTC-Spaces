import { ForgotPasswordData, LoginData, LoginResponse, MessageResponse, RegisterData, RegisterResponse, ResendVerificationLinkData } from '../@types';
import ApiService, { RequestMethods } from './api.service';

const authApi = ApiService.injectEndpoints({
  endpoints: build => ({
    register: build.mutation<RegisterResponse, RegisterData>({
      query: body => ({
        url: `/auth/register`,
        method: RequestMethods.POST,
        body,
      }),
    }),
    login: build.mutation<LoginResponse, LoginData>({
      query: body => ({
        url: `/auth/login`,
        method: RequestMethods.POST,
        body,
      }),
    }),
    verify: build.mutation<LoginResponse, LoginData>({
      query: body => ({
        url: `/auth/verifyUser`,
        method: RequestMethods.POST,
        body,
      }),
    }),
    verifyLink: build.mutation<MessageResponse, ResendVerificationLinkData>({
      query: body => ({
        url: `/auth/resendVerificationCode`,
        method: RequestMethods.POST,
        body,
      }),
    }),
    forgotPassword: build.mutation<MessageResponse, ForgotPasswordData>({
      query: body => ({
        url: `/auth/forgotPassword`,
        method: RequestMethods.POST,
        body,
      }),
    }),
    resetPassword: build.mutation<LoginResponse, LoginData>({
      query: body => ({
        url: `/auth/resetPassword`,
        method: RequestMethods.POST,
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyMutation,
  useVerifyLinkMutation,
} = authApi;
