import { Job } from 'bull';
import sharp from 'sharp';
import { downloadFile, logger } from '.';
import { MediaModel } from '../models';
import { uploadFileToAWSS3 } from '../services';
import type { ImageSize, ResizeMediaData, S3UploadResult } from '../types';

export const Sizes = {
  largeUrl: { width: 1500, height: 1500 },
  mediumUrl: { width: 750, height: 750 },
  thumbnailUrl: { width: 300, height: 300 },
  smallUrl: { width: 100, height: 100 },
};

export const SizesPerType = {
  PROFILE_PICTURE: {
    mediumUrl: Sizes.mediumUrl,
    smallUrl: Sizes.smallUrl,
    largeUrl: null,
    thumbnailUrl: null,
  },
};

export const resize = async (size: ImageSize, image: Buffer | string) => await sharp(image).resize(size.width, size.height).toBuffer();

export const resizeMedia = async (job: Job<ResizeMediaData>) => {
  try {
    let mediaLarge: null | S3UploadResult = null;
    let mediaMedium: null | S3UploadResult = null;
    let mediaThumbnail: null | S3UploadResult = null;
    let mediaSmall: null | S3UploadResult = null;

    const mediaId = job.data;
    const media = await MediaModel.findById(mediaId);
    const url = media.originalUrl;
    const filename = url.split('/').pop();
    const originalFileResponse = await downloadFile(url);
    const buffer = Buffer.from(originalFileResponse);

    const sizeFields = {
      largeUrl: null,
      mediumUrl: null,
      thumbnailUrl: null,
      smallUrl: null,
    };

    if (SizesPerType[media.type].largeUrl) {
      // resize to large
      mediaLarge = await uploadFileToAWSS3(`${filename}_1500x1500`, media.contentType, await resize(SizesPerType[media.type].mediumUrl, buffer));
      sizeFields.largeUrl = mediaLarge.Location;
    }
    job.progress(20);

    if (SizesPerType[media.type].mediumUrl) {
      // resize to medium
      mediaMedium = await uploadFileToAWSS3(`${filename}_750x750`, media.contentType, await resize(SizesPerType[media.type].mediumUrl, buffer));
      sizeFields.mediumUrl = mediaMedium.Location;
    }
    job.progress(40);

    if (SizesPerType[media.type].thumbnailUrl) {
      // resize to thumbnail
      mediaThumbnail = await uploadFileToAWSS3(`${filename}_300x300`, media.contentType, await resize(SizesPerType[media.type].thumbnailUrl, buffer));
      sizeFields.thumbnailUrl = mediaThumbnail.Location;
    }
    job.progress(60);

    if (SizesPerType[media.type].smallUrl) {
      // resize to small
      mediaSmall = await uploadFileToAWSS3(`${filename}_100x100`, media.contentType, await resize(SizesPerType[media.type].smallUrl, buffer));
      sizeFields.smallUrl = mediaSmall.Location;
    }
    job.progress(80);

    // save new media sizes
    const payload = { ...media.toJSON(), ...sizeFields };
    await media.update(payload);

    job.progress(100);
  } catch (e) {
    logger.error(e.stack, e.message);
  }
};
