import { object, string, TypeOf } from 'zod';
import { t } from '../utils';

const fields = {
  email: string({
    required_error: t('email_required'),
  }).email(t('email_invalid')),
  password: string({
    required_error: t('password_required'),
  }).min(6, t('password_field_length')),
  passwordConfirmation: string({
    required_error: t('password_confirmation_required'),
  }),
};

/**
 * @swagger
 * components:
 *  schemas:
 *    RegisterUserInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: user@email.com
 *        password:
 *          type: string
 *          default: password
 *    RegisterUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
export const registerUserSchema = object({
  body: object({
    email: fields.email,
    password: fields.password,
  }),
});

/**
 * @swagger
 * components:
 *  schemas:
 *    LoginInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: user@email.com
 *        password:
 *          type: string
 *          default: password
 *    LoginResponse:
 *        type: object
 *        properties:
 *          accessToken:
 *            type: string
 *          refreshToken:
 *            type: string
 *          _id:
 *            type: string
 *          createdAt:
 *            type: string
 *          updatedAt:
 *            type: string
 */
export const loginSchema = object({
  body: object({
    email: fields.email,
    password: fields.password,
  }),
});

/**
 * @swagger
 * components:
 *  schemas:
 *      VerifyUserResponse:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          fullName:
 *            type: string
 *          _id:
 *            type: string
 *          createdAt:
 *            type: string
 *          updatedAt:
 *            type: string
 */
export const verifyUserSchema = object({
  query: object({
    verificationCode: string(),
  }),
});

/**
 * @swagger
 * components:
 *  schemas:
 *    ResendVerificationCodeInput:
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        email:
 *          type: string
 *    ResendVerificationCodeResponse:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          fullName:
 *            type: string
 *          _id:
 *            type: string
 *          createdAt:
 *            type: string
 *          updatedAt:
 *            type: string
 */
export const resendVerificationCodeSchema = object({
  body: object({
    email: fields.email,
  }),
});

/**
 * @swagger
 * components:
 *  schemas:
 *    ForgotPasswordInput:
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        email:
 *          type: string
 *    ForgotPasswordResponse:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          fullName:
 *            type: string
 *          _id:
 *            type: string
 *          createdAt:
 *            type: string
 *          updatedAt:
 *            type: string
 */
export const forgotPasswordSchema = object({
  body: object({
    email: fields.email,
  }),
});

/**
 * @swagger
 * components:
 *  schemas:
 *    ResetPasswordInput:
 *      type: object
 *      required:
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        password:
 *          type: string
 *        passwordConfirmation:
 *          type: string
 *    ResetPasswordResponse:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          fullName:
 *            type: string
 *          _id:
 *            type: string
 *          createdAt:
 *            type: string
 *          updatedAt:
 *            type: string
 */
export const resetPasswordSchema = object({
  query: object({
    passwordResetCode: string(),
  }),
  body: object({
    password: fields.password,
    passwordConfirmation: fields.passwordConfirmation,
  }).refine(data => data.password === data.passwordConfirmation, {
    message: t('password_dont_match'),
    path: ['passwordConfirmation'],
  }),
});

/**
 * @swagger
 * components:
 *  schemas:
 *    NewPasswordInput:
 *      type: object
 *      required:
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        password:
 *          type: string
 *        passwordConfirmation:
 *          type: string
 *    NewPasswordResponse:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          fullName:
 *            type: string
 *          _id:
 *            type: string
 *          createdAt:
 *            type: string
 *          updatedAt:
 *            type: string
 */
export const newPasswordSchema = object({
  body: object({
    password: fields.password,
    passwordConfirmation: fields.passwordConfirmation,
  }).refine(data => data.password === data.passwordConfirmation, {
    message: t('password_dont_match'),
    path: ['passwordConfirmation'],
  }),
});

/**
 * @swagger
 * components:
 *  schemas:
 *    NewTokenInput:
 *      type: object
 *      required:
 *        - refreshToken
 *      properties:
 *        refreshToken:
 *          type: string
 *    NewTokenResponse:
 *        type: object
 *        properties:
 *          token:
 *            type: string
 */
export const tokenSchema = object({
  body: object({
    refreshToken: string({ required_error: t('refresh_token_required') }),
  }),
});

export type RegisterUserInput = TypeOf<typeof registerUserSchema>['body'];

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['query'];

export type ResendVerificationCodeInput = TypeOf<typeof resendVerificationCodeSchema>['body'];

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;

export type NewPasswordInput = TypeOf<typeof newPasswordSchema>;

export type LoginInput = TypeOf<typeof loginSchema>['body'];

export type NewTokenInput = TypeOf<typeof tokenSchema>['body'];
