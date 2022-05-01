import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { MediaModel, UserDocument } from '../models';
import { CreateMediaInput, LoadMediaInput } from '../schema';
import { deleteFileFromAWSS3, generateUploadURL } from '../services';
import { t } from '../utils';

export async function load(req: Request<LoadMediaInput>, res: Response, next: NextFunction) {
  const { id } = req.params;
  const media = await MediaModel.findById(id);
  res.locals.media = media;
  return next();
}

export async function get(req, res) {
  res.json(res.locals.media);
}

export async function create(req: Request<CreateMediaInput>, res: Response) {
  const ownerId = (req.user as UserDocument).id;
  const media = await MediaModel.create({ ...req.body, ownerId });
  res.status(httpStatus.CREATED).json({ message: t('file_upload_success'), media: media.toJSON() });
}

export async function s3UploadUrl(req: Request, res: Response) {
  const url = await generateUploadURL(req.body.fileType);
  res.send({ url });
}

export async function update(req: Request, res: Response) {
  const media = Object.assign(res.locals.media, req.body);
  const savedMedia = await media.save();
  res.status(httpStatus.OK);
  res.json(savedMedia);
}

export async function remove(req: Request, res: Response) {
  const { media } = res.locals;
  await deleteFileFromAWSS3(media.originalUrl);
  await media.remove();
  return res.status(httpStatus.OK).send({ message: t('delete_success') });
}
