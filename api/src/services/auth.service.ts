import { signJwt } from '../utils/jwt';
import { findUserById } from '.';
import { verifyJwt } from '../utils';
import config from 'config';
import { UserDocument } from '../models';

export type AccessTokenJWTPayload = {
  sub: string;
};

export type RefreshTokenJWTPayload = {
  sub: string;
};

const expiresIn = 60 * 60;

export async function signRefreshToken({ sub }: RefreshTokenJWTPayload) {
  const refreshToken = signJwt(
    {
      sub,
    },
    {
      expiresIn: '1y',
    },
  );

  return refreshToken;
}

export function signAccessToken(payload: AccessTokenJWTPayload) {
  const accessToken = signJwt(payload, {
    expiresIn,
  });

  return accessToken;
}

export function getCookie(accessToken: string) {
  const cookieName = config.get<string>('cookieName');
  return `${cookieName}=${accessToken}; HttpOnly; Path=http://localhost:8000/; Max-Age=${expiresIn};`;
}

export function generatePasswordResetCode(email: string) {
  const passwordResetCode = signJwt(
    { email },
    {
      expiresIn: '1h',
    },
  );

  return passwordResetCode;
}

export function generateVerificationCode(email: string) {
  const verificationCode = signJwt(
    { email },
    {
      expiresIn: '1d',
    },
  );

  return verificationCode;
}

export async function reIssueAccessToken({ refreshToken }: { refreshToken: string }): Promise<{ accessToken: string; user: UserDocument } | false> {
  const decoded = verifyJwt(refreshToken) as RefreshTokenJWTPayload;

  if (!decoded || !decoded.sub) return false;

  const user = await findUserById(decoded.sub);
  console.log({ decoded, refreshToken });

  if (!user) return false;

  const accessToken = signAccessToken({ sub: user.id });

  return { user, accessToken };
}
