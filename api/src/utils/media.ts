import sharp from 'sharp';
import { MediaTypes } from '../models';
import { ImageSize } from '../types';

export const sizes = {
  [MediaTypes.PROFILE_PICTURE]: [
    { width: 120, height: 120 },
    { width: 50, height: 50 },
  ],
};

export const resize = (size: ImageSize, image: Buffer | string) => sharp(image).resize(size.width, size.height).toBuffer();
