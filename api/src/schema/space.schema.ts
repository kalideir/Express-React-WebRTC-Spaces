import { boolean, object, string, TypeOf } from 'zod';
import { SpaceStatus } from '../models';
import { t } from '../utils';

const oneOf = (keys: string[]) => val => {
  if (keys.includes(val)) return true;
  return false;
};

const payload = {
  body: object({
    title: string({
      required_error: t('space_title_required'),
    }).optional(),
    isPublic: boolean().default(false),
    status: string({ required_error: t('') })
      .refine(oneOf(Object.keys(SpaceStatus)), t(''))
      .default(SpaceStatus.CREATED),
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

export const getSpaceSchema = object({
  params,
});

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
export type LoadSpaceInput = Partial<TypeOf<typeof getSpaceSchema>>['params'];
export type UpdateSpaceInput = Partial<TypeOf<typeof updateSpaceSchema>>;
export type ListSpacesInput = TypeOf<typeof listSpacesSchema>;
export type GetSpacesInput = TypeOf<typeof getSpaceSchema>['params'];
export type DeleteSpaceInput = TypeOf<typeof deleteSpaceSchema>;
