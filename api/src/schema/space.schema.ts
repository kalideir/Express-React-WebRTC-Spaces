import { boolean, number, object, string, TypeOf } from 'zod';
import { t } from '../utils';

const payload = {
  body: object({
    title: string({
      required_error: t('space_title_required'),
    }).optional(),
    isPublic: boolean().default(false),
  }),
};

export const getSpaceSchema = object({
  params: object({
    id: string(),
  }),
});

export const updateSpaceSchema = object({
  ...payload,
});

const params = {
  params: object({
    id: string({
      required_error: t('id_required'),
    }),
  }),
};

const query = {
  query: object({
    page: string({}).optional(),
    limit: string({}).optional(),
    search: string({}).optional(),
  }),
};

export const listSpacesSchema = object({
  ...query,
});

export const deleteSpaceSchema = object({
  ...params,
});

export type UpdateSpaceInput = Partial<TypeOf<typeof updateSpaceSchema>>;
export type ListSpacesInput = TypeOf<typeof listSpacesSchema>;
export type GetSpacesInput = TypeOf<typeof getSpaceSchema>;
export type DeleteSpaceInput = TypeOf<typeof deleteSpaceSchema>;
