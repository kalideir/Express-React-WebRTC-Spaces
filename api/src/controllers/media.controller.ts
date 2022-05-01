import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { MediaModel, UserDocument } from '../models';
import { CreateMediaInput, DeleteMediaInput, LoadMediaInput } from '../schema';
import { deleteFileFromAWSS3, generateUploadURL } from '../services';
import { t } from '../utils';

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
  // const filename = `${nanoid(10)}_${Date.now()}_${req.file.originalname.split(' ').join('_')}`;
  // const fileType = req.file.mimetype;
  // const uploadType = req.body.type as MediaTypesKey;
  // const { name, ext } = path.parse(filename);
  // const desiredSizes = sizes[uploadType];
  // const buffers = await Promise.all(desiredSizes.map((size: ImageSize) => resize(size, req.file.path)));

  // const results = await Promise.all(
  //   buffers.map((buffer, index) =>
  //     uploadFileToAWSS3(`${name}_${desiredSizes[index].width}x${desiredSizes[index].height}.${ext}`, fileType, buffer, desiredSizes[index].name),
  //   ),
  // );
  const ownerId = (req.user as UserDocument).id;
  const media = await MediaModel.create({ ...req.body, ownerId });
  res.status(httpStatus.CREATED).json({ message: t('file_upload_success'), media: media.toJSON() });
}

export async function s3UploadUrl(req: Request, res: Response) {
  const url = await generateUploadURL(req.body.fileType, req.body.extension);
  res.send({ url });
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
