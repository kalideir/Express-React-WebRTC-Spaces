import { Request } from 'express';
import { SendMailOptions } from 'nodemailer';
import { UserDocument } from '../models';

export interface EnhancedRequest<T = void> extends Request<T> {
  user?: UserDocument;
  isAuthenticated: () => boolean;
}

export type SendMailContext = {
  description: string;
  actionUrl: string;
  action: string;
};

export type EmailData = {
  emailOptions: SendMailOptions;
  context: SendMailContext;
};

export type EmailTemplate = 'register' | 'email' | 'account-verification';

export type S3Body = string | Buffer | Uint8Array | Blob | Readable;

export type SendEmailJobData = {
  emailOptions: SendMailOptions;
  context: SendEmailContext;
  template: EmailTemplate;
};
