import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sharp from 'sharp';
import { MediaModel, MediaTypes } from '../models';
import { CreateMediaInput, DeleteMediaInput, LoadMediaInput } from '../schema';
import { deleteFileFromAWSS3, uploadFileToAWSS3 } from '../services';
import { logger, t } from '../utils';
import { S3 } from 'aws-sdk';
import { resize, sizes } from '../utils/media';
import { ImageSize, MediaTypesKey } from '../types';

export async function load(req: Request<LoadMediaInput['params']>, res: Response, next: NextFunction) {
  const { id } = req.params;
  const media = await MediaModel.findById(id);
  res.locals.media = media;
  return next();
}

export async function get(req, res) {
  res.json(res.locals.media);
}

export async function create(req: Request<CreateMediaInput>, res: Response) {
  const filename = `/${Math.floor(Math.random() * 999)}_${Date.now()}_${req.file.originalname.split(' ').join('_')}`;
  const fileType = req.file.mimetype;
  const uploadType = req.body.type as MediaTypesKey;
  let image: unknown | S3.ManagedUpload.SendData;
  Promise.all(
    sizes[uploadType].map((size: ImageSize) => resize(size, req.file.buffer)).map(buffer => uploadFileToAWSS3(filename, fileType, buffer)),
  ).then(results => {
    logger.debug(results);
  });
  // payload = { ...payload, originalUrl: image.Location };
  // const savedMedia = await MediaModel.create(payload);
  // logger.info(savedMedia.toJSON());
  // logger.info(image);

  // res.status(httpStatus.CREATED).json({ message: 'Media skapades framgångsrikt.', media: { ...savedMedia.toJSON() } });
  // res.send({});
  // const savedMedia = await MediaModel.create(payload);
  // logger.info(savedMedia.toJSON());
  // logger.info(image);
  res.status(httpStatus.CREATED).json({ message: t('file_upload_success'), media: {} });
}

export async function update(req: Request, res: Response) {
  const media = Object.assign(res.locals.media, req.body);
  const savedMedia = await media.save();
  res.status(httpStatus.OK);
  res.json(savedMedia);
}

export async function remove(req: Request<DeleteMediaInput['params']>, res: Response) {
  const { media } = res.locals;
  await deleteFileFromAWSS3(media.originalUrl);
  await media.remove();
  return res.status(httpStatus.OK).send({ message: t('delete_success') });
}
