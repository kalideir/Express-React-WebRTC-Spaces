import jwt from 'jsonwebtoken';
import config from 'config';

export function signJwt(object: object, options?: jwt.SignOptions | undefined) {
  const signingKey = config.get<string>('jwtSecret');
  return jwt.sign(object, signingKey, {
    ...(options && options),
  });
}

export function verifyJwt<T>(token: string): T | null {
  const signingKey = config.get<string>('jwtSecret');
  try {
    const decoded = jwt.verify(token, signingKey) as T;
    return decoded;
  } catch (e) {
    return null;
  }
}
