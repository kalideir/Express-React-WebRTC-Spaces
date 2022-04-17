import { Request } from 'express';
import { UserDocument } from '../models';

export interface EnhancedRequest<T = void> extends Request<T> {
  user?: UserDocument;
  isAuthenticated: () => boolean;
}
