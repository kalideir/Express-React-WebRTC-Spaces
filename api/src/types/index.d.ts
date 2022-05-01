import { Request } from 'express';
import type { S3 } from 'aws-sdk';
import { SendMailOptions } from 'nodemailer';
import { MediaTypes, UserDocument } from '../models';

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
  context: SendMailContext;
  template: EmailTemplate;
};

export type MediaTypesKey = keyof typeof MediaTypes;

export type ImageSize = {
  width: number;
  height: number;
};

export type SizeType = {
  [size: SizeName]: {
    width: number;
    height: number;
  };
};

export type SizeTypes = {
  [type: string]: SizeType;
};

export type SizeName = 'thumbnaillUrl' | 'mediumUrl' | 'largelUrl' | 'smallUrl';

export type S3UploadResult = S3.ManagedUpload.SendData;

export type SizesUrls = { [sizeName: SizeName]: string };

export type MediaData = Partial<{
  type: MediaTypesKey;
  originalUrl: string;
  largeUrl: string;
  mediumUrl: string;
  smallUrl: string;
  contentType: string;
}>;

export type MediaItem = Partial<{
  createdAt: Date;
  updatedAt: Date;
}> &
  MediaData;

export type ResizeMediaData = MediaData & { id: string };
