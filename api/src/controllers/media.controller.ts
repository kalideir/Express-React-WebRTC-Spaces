import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sharp from 'sharp';
import { MediaModel } from '../models';
import { CreateMediaInput, DeleteMediaInput, LoadMediaInput } from '../schema';
import { deleteFileFromAWSS3, uploadFileToAWSS3 } from '../services';
import { logger, t } from '../utils';
import { S3 } from 'aws-sdk';

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
  const filename = `${Math.floor(Math.random() * 999)}_${Date.now()}_${req.file.originalname.split(' ').join('_')}`;
  const fileType = req.file.mimetype;
  const image: S3.ManagedUpload.SendData = await uploadFileToAWSS3(`${filename}`, fileType, req.file.buffer);
  const payload = { ...req.body, originalUrl: image.Location };
  const savedMedia = await MediaModel.create(payload);
  logger.info(savedMedia.toJSON());
  logger.info(image);
  res.status(httpStatus.CREATED).json({ message: t('file_upload_success'), media: { ...savedMedia.toJSON() } });
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

export async function upload(req: Request, res: Response) {
  const filename = `${Math.floor(Math.random() * 999)}_${Date.now()}_${req.file.originalname.split(' ').join('_')}`;
  const fileType = req.file.mimetype;
  const uploadType = req.body.type;
  let image: unknown;
  if (uploadType === 'PROFILE-PICTURE') {
    const buffer = await sharp(req.file.buffer).resize(200, 200).toBuffer();
    image = await uploadFileToAWSS3(`/${filename}`, fileType, buffer);
  } else {
    image = await uploadFileToAWSS3(`/${filename}`, fileType, req.file.buffer);
  }
  res.send(image);
}
