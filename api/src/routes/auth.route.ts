import { Router } from 'express';
import * as controller from '../controllers/auth.controller';
import { authorizeUser, googleAuthorize, googleRedirect, setCookie, validate } from '../middleware';
import {
  forgotPasswordSchema,
  loginSchema,
  newPasswordSchema,
  registerUserSchema,
  resendVerificationCodeSchema,
  resetPasswordSchema,
  tokenSchema,
  verifyUserSchema,
} from '../schema';
import { use } from '../utils';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register new user
 *     security: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/RegisterUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegisterUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/register', validate(registerUserSchema), use(controller.register));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user
 *     security: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginInput'
 *     responses:
 *      200:
 *        description: Success
 *        headers:
 *          Set-Cookie:
 *            schema:
 *              type: string
 *              example: authCookie=abcde12345; Path=/; HttpOnly
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/login', validate(loginSchema), use(controller.login));

/**
 * @swagger
 * /auth/verifyUser:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Verify user
 *     security: []
 *     parameters:
 *       - name: verificationCode
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/VerifyUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/verifyUser', validate(verifyUserSchema), use(controller.verifyUser));

/**
 * @swagger
 * /auth/resendVerificationCode:
 *   post:
 *     tags:
 *       - Auth
 *     name: Forgot Password
 *     summary: Forgot password
 *     security: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/ResendVerificationCodeInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResendVerificationCodeResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/resendVerificationCode', validate(resendVerificationCodeSchema), use(controller.resendVerificationCode));

/**
 * @swagger
 * /auth/forgotPassword:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Forgot password
 *     security: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/ForgotPasswordInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ForgotPasswordResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/forgotPassword', validate(forgotPasswordSchema), controller.forgotPassword);

/**
 * @swagger
 * /auth/resetPassword:
 *   post:
 *     tags:
 *       - Auth
 *     name: Forgot Password
 *     summary: Forgot password
 *     security: []
 *     parameters:
 *      - name: passwordResetCode
 *        in: query
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/ResetPasswordInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResetPasswordResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/resetPassword', validate(resetPasswordSchema), controller.resetPassword);

/**
 * @swagger
 * /auth/newPassword:
 *   post:
 *     tags:
 *       - Auth
 *     name: Forgot Password
 *     summary: Forgot password
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/NewPasswordInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NewPasswordResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/newPassword', authorizeUser, validate(newPasswordSchema), use(controller.newPassword));

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get user by access token
 *     security:
 *       - cookieAuth: []
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetUserResponse'
 */
router.get('/me', authorizeUser, use(controller.me));

/**
 * @swagger
 * /auth/token:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Regenerate token
 *     security: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/NewTokenInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NewTokenResponse'
 */
router.post('/token', validate(tokenSchema), use(controller.token));

router.get('/google', googleAuthorize);

router.get('/google/callback', googleRedirect, setCookie, use(controller.googleOauth));

router.get('/logout', use(controller.logout));

export default router;
