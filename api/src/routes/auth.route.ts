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

router.post('/register', validate(registerUserSchema), use(controller.register));

router.post('/login', validate(loginSchema), use(controller.login));

router.post('/verifyUser', validate(verifyUserSchema), use(controller.verifyUser));

router.post('/resendVerificationCode', validate(resendVerificationCodeSchema), use(controller.resendVerificationCode));

router.post('/forgotPassword', validate(forgotPasswordSchema), controller.forgotPassword);

router.post('/resetPassword', validate(resetPasswordSchema), controller.resetPassword);

router.post('/newPassword', authorizeUser, validate(newPasswordSchema), use(controller.newPassword));

router.get('/me', authorizeUser, use(controller.me));

router.post('/token', validate(tokenSchema), use(controller.token));

router.get('/google', googleAuthorize);

router.get('/google/callback', googleRedirect, setCookie, use(controller.googleOauth));

router.get('/logout', use(controller.logout));

export default router;
