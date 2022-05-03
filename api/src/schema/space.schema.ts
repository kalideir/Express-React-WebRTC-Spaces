import { boolean, object, string, TypeOf } from 'zod';
import { t } from '../utils';

const payload = {
  body: object({
    title: string({
      required_error: t('space_title_required'),
    }).optional(),
    isPublic: boolean().default(false),
  }),
};

const params = object({
  key: string(),
});

export const createSpaceSchema = object({
  ...payload,
});

export const updateSpaceSchema = object({
  ...payload,
  params,
});

export const getSpaceSchema = params;

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
  params,
});

export type CreateSpaceInput = Partial<TypeOf<typeof createSpaceSchema>>;
export type LoadSpaceInput = Partial<TypeOf<typeof getSpaceSchema>>;
export type UpdateSpaceInput = Partial<TypeOf<typeof updateSpaceSchema>>;
export type ListSpacesInput = TypeOf<typeof listSpacesSchema>;
export type GetSpacesInput = TypeOf<typeof getSpaceSchema>;
export type DeleteSpaceInput = TypeOf<typeof deleteSpaceSchema>;
