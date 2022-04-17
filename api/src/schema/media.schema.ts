import { object, string, TypeOf } from 'zod';
import { t } from '../utils';

const payload = {
  body: object({
    type: string({
      required_error: t('media_type_required'),
    }),
  }),
};

const params = {
  params: object({
    id: string({
      required_error: t('id_required'),
    }),
  }),
};

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateMediaInput:
 *      type: object
 *      required:
 *        - type
 *        - file
 *        - contentType
 *      properties:
 *        type:
 *          type: string
 *        contentType:
 *          type: string
 *        file:
 *          type: string
 *          format: binary
 *    CreateMediaResponse:
 *      type: object
 */
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
export type LoadMediaInput = GetMediaInput;
