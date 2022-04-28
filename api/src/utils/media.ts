import sharp from 'sharp';
import { MediaTypes } from '../models';
import { ImageSize } from '../types';

export const sizes = {
  [MediaTypes.PROFILE_PICTURE]: [
    { width: 120, height: 120 },
    { width: 40, height: 40 },
  ],
};

export const resize = (size: ImageSize, image: Buffer) => {
  const buffer = sharp(image).resize(size.width, size.height).toBuffer();
  console.log(buffer, 'xx');
  return buffer;
};
