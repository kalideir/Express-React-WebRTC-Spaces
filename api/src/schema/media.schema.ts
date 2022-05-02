import { object, string, TypeOf } from 'zod';
import { MediaTypes } from '../models';
import { t } from '../utils';

const oneOf = (keys: string[]) => val => {
  if (keys.includes(val)) return true;
  return false;
};

const payload = {
  body: object({
    type: string({ required_error: t('media_type_required') }).refine(oneOf(Object.keys(MediaTypes)), t('media_type_invalid')),
    contentType: string({ required_error: t('media_content_type_required') }),
    originalUrl: string().optional(),
    largeUrl: string().optional(),
    mediumUrl: string().optional(),
    smallUrl: string().optional(),
  }),
};

const params = {
  params: object({
    id: string({
      required_error: t('id_required'),
    }),
  }),
};

export const createMediaSchema = object({
  ...payload,
});

export const updateMediaSchema = object({
  ...payload,
  ...params,
});

export const deleteMediaSchema = object({
  ...params,
});

export const getMediaSchema = object({
  ...params,
});

export type CreateMediaInput = TypeOf<typeof createMediaSchema>;
export type UpdateMediaInput = TypeOf<typeof updateMediaSchema>;
export type GetMediaInput = TypeOf<typeof getMediaSchema>;
export type DeleteMediaInput = TypeOf<typeof deleteMediaSchema>;
export type LoadMediaInput = GetMediaInput['params'];
