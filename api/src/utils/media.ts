import sharp from 'sharp';
import { MediaTypes } from '../models';
import type { ImageSize, S3UploadResult, SizesTypes, SizesUrls } from '../types';

export const sizes: SizesTypes = {
  [MediaTypes.PROFILE_PICTURE]: [
    { name: 'mediumUrl', width: 120, height: 120 },
    { name: 'smallUrl', width: 50, height: 50 },
  ],
};

export const resize = (size: ImageSize, image: Buffer | string) => sharp(image).resize(size.width, size.height).toBuffer();

export const sizesUrls = (results: S3UploadResult[]): SizesUrls =>
  results.reduce((acc, current: S3UploadResult) => Object.assign(acc, { [current.sizeName]: current.Location }), {});
