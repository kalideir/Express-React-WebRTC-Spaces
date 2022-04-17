import { NextFunction, Request, Response } from 'express';
import config from 'config';
import { ApiError } from '../errors';
import { UserModel } from '../models';
import {
  RegisterUserInput,
  ForgotPasswordInput,
  LoginInput,
  NewTokenInput,
  ResendVerificationCodeInput,
  ResetPasswordInput,
  VerifyUserInput,
  NewPasswordInput,
} from '../schema';
import {
  findUser,
  findUserByEmail,
  generatePasswordResetCode,
  generateVerificationCode,
  reIssueAccessToken,
  signAccessToken,
  signRefreshToken,
} from '../services';
import { EnhancedRequest } from '../types';
import { logger, t } from '../utils';

const cookieName = config.get<string>('cookieName');

export async function register(req: Request<RegisterUserInput>, res: Response, next: NextFunction) {
  const input = req.body;
  const exists = await findUserByEmail(input.email);
  if (exists) {
    return next(ApiError.conflict(t('account_already_exists')));
  }
  const user = await UserModel.create(input);
  const verificationCode = await generateVerificationCode(user.email);
  user.verificationCode = verificationCode;
  await user.save();
  res.json({ message: t('account_create_success') });
}

export async function login(req: Request<LoginInput>, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  let user = await findUserByEmail(email);

  if (!user) {
    return next(ApiError.unauthorized(t('user_not_found')));
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return next(ApiError.unauthorized(t('login_invalid')));
  }

  if (!user.verified) {
    return next(ApiError.unauthorized(t('account_not_verified')));
  }

  if (!user.active) {
    return next(ApiError.unauthorized(t('login_invalid')));
  }

  const accessToken = signAccessToken({ sub: user._id });

  const refreshToken = await signRefreshToken({ sub: user._id });

  user = await user.populate('profilePicture');

  res.cookie(cookieName, accessToken, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    secure: process.env.NODE_ENV !== 'development',
  });

  return res.send({
    refreshToken,
    accessToken,
    user: user.toJSON(),
    message: t('login_success'),
  });
}

export async function verifyUser(req: Request<VerifyUserInput>, res: Response, next: NextFunction) {
  const { verificationCode } = req.query;

  const user = await findUser({ verificationCode });

  if (!user) {
    return next(ApiError.unauthorized(t('user_not_found')));
  }

  if (user.verified) {
    return next(ApiError.forbidden(t('account_already_verified')));
  }

  user.verified = true;
  user.verificationCode = null;
  await user.save();

  const accessToken = signAccessToken({ sub: user.id });

  const refreshToken = await signRefreshToken({ sub: user._id });

  return res.send({
    accessToken,
    refreshToken,
    user: user.toJSON(),
    message: t('verification_success'),
  });
}

export async function resendVerificationCode(req: Request<ResendVerificationCodeInput>, res: Response, next: NextFunction) {
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return next(ApiError.unauthorized(t('user_not_found')));
  }

  if (user.verified) {
    return next(ApiError.forbidden(t('account_already_verified')));
  }

  const verificationCode = await generateVerificationCode(user.email);

  user.verificationCode = verificationCode;

  await user.save();

  logger.debug(`Verification code was resent to ${email}`);

  return res.send({ message: t('verification_code_was_sent') });
}

export async function forgotPassword(req: Request<ForgotPasswordInput>, res: Response, next: NextFunction) {
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return next(ApiError.unauthorized(t('user_not_found')));
  }

  if (!user.verified) {
    return next(ApiError.forbidden(t('account_not_verified')));
  }

  const passwordResetCode = await generatePasswordResetCode(user.email);

  user.passwordResetCode = passwordResetCode;

  await user.save();

  logger.debug(`Reset password link was sent to ${email}`);

  return res.send({ message: t('reset_password_link_sent') });
}

export async function resetPassword(req: Request<ResetPasswordInput>, res: Response, next: NextFunction) {
  const { passwordResetCode } = req.query as { passwordResetCode: string };

  const { password } = req.body;

  const user = await findUser({ passwordResetCode });

  if (!user || !user.passwordResetCode || user.passwordResetCode !== passwordResetCode) {
    return next(ApiError.forbidden(t('not_allowed')));
  }

  user.passwordResetCode = null;

  user.password = password;

  await user.save();

  return res.send({ message: t('password_reset_success') });
}

export async function newPassword(req: EnhancedRequest<NewPasswordInput>, res: Response) {
  const { password } = req.body;

  const user = req.user;

  user.password = password;

  await user.save();

  return res.send({ message: t('password_reset_success') });
}

export async function me(req: EnhancedRequest, res: Response) {
  let user = req.user;
  user = await user.populate('profilePicture');
  return res.send({ user: user.toJSON() });
}

export async function token(req: Request<unknown, unknown, NewTokenInput>, res: Response, next: NextFunction) {
  const { refreshToken } = req.body;

  const newAccessToken = await reIssueAccessToken({ refreshToken });

  if (newAccessToken) {
    res.cookie(cookieName, newAccessToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      secure: process.env.NODE_ENV !== 'development',
    });
  }

  return next(ApiError.forbidden(t('not_allowed')));
}

export async function googleOauth(req: EnhancedRequest, res: Response) {
  let user = req.user;

  const refreshToken = await signRefreshToken({ sub: user._id });

  user = await user.populate('profilePicture');

  return res.send({
    refreshToken,
    user: user.toJSON(),
    message: t('login_success'),
  });
}

export async function logout(req: Request, res: Response) {
  req.logout();
  return res.redirect('/');
}
