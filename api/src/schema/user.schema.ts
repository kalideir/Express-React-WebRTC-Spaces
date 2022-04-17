import { object, string, TypeOf } from 'zod';
import { t } from '../utils';

const userPayload = {
  body: object({
    firstName: string({
      required_error: 'First name is required',
    }).optional(),
    lastName: string({
      required_error: 'Last name is required',
    }).optional(),
    address: string({
      required_error: 'Address is required',
    }).optional(),
    phoneNumber: string({
      required_error: 'Phone number is required',
    }).optional(),
    profilePictureId: string({}).nullable().optional(),
    endDate: string({
      required_error: 'End date is required',
    }).optional(),
  }),
};

/**
 * @swagger
 * components:
 *  schemas:
 *    GetUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        phoneNumber:
 *          type: string
 *        address:
 *          type: string
 *        birthdate:
 *          type: string
 *        profilePicture:
 *          type: string
 *        role:
 *          type: string
 */
export const getUserSchema = object({
  params: object({
    id: string(),
  }),
});

/**
 * @swagger
 * components:
 *  schemas:
 *    UpdateUserInput:
 *      type: object
 *    UpdateUserResponse:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          createdAt:
 *            type: string
 *          updatedAt:
 *            type: string
 *          phoneNumber:
 *            type: string
 *          profilePicture:
 *            type: string
 *          id:
 *            type: string
 */
export const updateUserSchema = object({
  ...userPayload,
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
    role: string({}).optional(),
    page: string({}).optional(),
    limit: string({}).optional(),
    search: string({}).optional(),
  }),
};

/**
 * @swagger
 * components:
 *  schemas:
 *    ListUsersResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *        phoneNumber:
 *          type: string
 *        address:
 *          type: string
 *        birthdate:
 *          type: string
 *        profilePicture:
 *          type: string
 *        role:
 *          type: string
 */
export const listUsersSchema = object({
  ...query,
});

/**
 * @swagger
 * components:
 *  schemas:
 *    UpdateUserInput:
 *      type: object
 *    UpdateUserResponse:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          createdAt:
 *            type: string
 *          updatedAt:
 *            type: string
 *          phoneNumber:
 *            type: string
 *          profilePicture:
 *            type: string
 *          id:
 *            type: string
 */
export const updateOtherUserSchema = object({
  ...userPayload,
  params: object({ id: string({ required_error: t('id_required') }) }),
});

export const deleteUserSchema = object({
  ...params,
});

export type UpdateUserInput = Partial<TypeOf<typeof updateUserSchema>>;
export type ListUsersInput = TypeOf<typeof listUsersSchema>;
export type GetUsersInput = TypeOf<typeof getUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;
