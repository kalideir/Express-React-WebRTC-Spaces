import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { StrategyTypes } from '../auth';
import { ApiError } from '../errors';
import { signAccessToken } from '../services';
import config from 'config';
import { t } from '../utils';

const handler = (req, res, next) => async (err, user, info) => {
  const error = err || info;
  if (err) {
    return next(ApiError.internalServerError(error.message || t('something_went_wrong')));
  }
  if (!user) {
    return next(ApiError.unauthorized(error.message || t('unauthorized')));
  }
  if (!user.active) {
    return next(ApiError.unauthorized(t('unauthorized')));
  }
  if (!user.verified) {
    return next(ApiError.unauthorized(t('account_not_verified')));
  }
  try {
    await req.logIn(user, { session: false });
  } catch (e) {
    return next(e);
  }
  req.user = user;
  return next();
};

export const authorizeUser = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate(StrategyTypes.Jwt, { session: false }, handler(req, res, next))(req, res, next);

export const authorizeStaff = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate(StrategyTypes.StaffJwt, { session: false }, handler(req, res, next))(req, res, next);

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate(StrategyTypes.AdminJwt, { session: false }, handler(req, res, next))(req, res, next);

export const googleAuthorize = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate(StrategyTypes.GoogleOauth, { scope: ['email', 'profile'] })(req, res, next);

export const googleRedirect = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate(
    StrategyTypes.GoogleOauth,
    {
      successRedirect: '/',
      session: true,
    },
    handler(req, res, next),
  )(req, res, next);

export function setCookie(req, res, next) {
  const accessToken = signAccessToken({ sub: req.user._id });
  const cookieName = config.get<string>('cookieName');
  res.cookie(cookieName, accessToken, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    secure: process.env.NODE_ENV !== 'development',
  });
  next();
}
