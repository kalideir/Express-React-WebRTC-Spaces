import { object, string, TypeOf } from 'zod';
import { t } from '../utils';

const fields = {
  email: string({
    required_error: t('email_required'),
  }).email(t('email_invalid')),
  username: string({
    required_error: t('username_required'),
  }).min(1, t('username_field_length')),
  password: string({
    required_error: t('password_required'),
  }).min(6, t('password_field_length')),
  passwordConfirmation: string({
    required_error: t('password_confirmation_required'),
  }),
};

export const registerUserSchema = object({
  body: object({
    email: fields.email,
    username: fields.username,
    password: fields.password,
  }),
});

export const loginSchema = object({
  body: object({
    email: fields.email,
    password: fields.password,
  }),
});

export const verifyUserSchema = object({
  body: object({
    verificationCode: string(),
  }),
});

export const resendVerificationCodeSchema = object({
  body: object({
    email: fields.email,
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: fields.email,
  }),
});

export const resetPasswordSchema = object({
  body: object({
    passwordResetCode: string(),
    password: fields.password,
    passwordConfirmation: fields.passwordConfirmation,
  }).refine(data => data.password === data.passwordConfirmation, {
    message: t('password_dont_match'),
    path: ['passwordConfirmation'],
  }),
});

export const newPasswordSchema = object({
  body: object({
    password: fields.password,
    passwordConfirmation: fields.passwordConfirmation,
  }).refine(data => data.password === data.passwordConfirmation, {
    message: t('password_dont_match'),
    path: ['passwordConfirmation'],
  }),
});

export const tokenSchema = object({
  body: object({
    refreshToken: string({ required_error: t('refresh_token_required') }),
  }),
});

export type RegisterUserInput = Required<TypeOf<typeof registerUserSchema>['body']>;

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['body'];

export type ResendVerificationCodeInput = TypeOf<typeof resendVerificationCodeSchema>['body'];

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;

export type NewPasswordInput = TypeOf<typeof newPasswordSchema>;

export type LoginInput = TypeOf<typeof loginSchema>['body'];

export type NewTokenInput = TypeOf<typeof tokenSchema>['body'];
