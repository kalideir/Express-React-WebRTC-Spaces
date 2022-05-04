import { number, object, string, TypeOf } from 'zod';
import { t } from '../utils';

const payload = {
  body: object({
    firstName: string({
      required_error: t('first_name_required'),
    }).optional(),
    lastName: string({
      required_error: t('last_name_required'),
    }).optional(),
    address: string({
      required_error: t('address_required'),
    }).optional(),
    phoneNumber: number({
      required_error: t('phone_number_required'),
    }).optional(),
    profilePictureId: string({}).nullable().optional(),
  }),
};

export const getUserSchema = object({
  params: object({
    id: string(),
  }),
});

export const updateUserSchema = object({
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

export const listUsersSchema = object({
  ...query,
});

export const updateOtherUserSchema = object({
  ...payload,
  params: object({ id: string({ required_error: t('id_required') }) }),
});

export const deleteUserSchema = object({
  ...params,
});

export type UpdateUserInput = Partial<TypeOf<typeof updateUserSchema>>;
export type ListUsersInput = TypeOf<typeof listUsersSchema>;
export type GetUsersInput = TypeOf<typeof getUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;
