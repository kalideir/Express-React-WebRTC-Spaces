import { object, string, TypeOf } from 'zod';
import { ParticipantTypes } from '../models';
import { t } from '../utils';

const oneOf = (keys: string[]) => val => {
  if (keys.includes(val)) return true;
  return false;
};

const payload = {
  body: object({
    userId: string({
      required_error: t('participant_id_required'),
    }).optional(),
    type: string({ required_error: t('participant_type_required') }).refine(oneOf(Object.keys(ParticipantTypes)), t('participant_type_invalpid')),
  }),
};

const params = {
  params: object({
    pid: string({
      required_error: t('id_required'),
    }),
  }),
};

export const createParticipantSchema = object({
  ...payload,
});

export const getParticipantSchema = object({
  ...params,
});

export const updateParticipantSchema = object({
  ...payload,
  ...params,
});

const query = object({
  page: string({}).optional(),
  limit: string({}).optional(),
  search: string({}).optional(),
});

export const listParticipantsSchema = object({
  query,
});

export const deleteParticipantSchema = object({
  ...params,
});

export type CreateParticipantInput = TypeOf<typeof createParticipantSchema>['body'];
export type UpdateParticipantInput = TypeOf<typeof updateParticipantSchema>;
export type ListParticipantsInput = TypeOf<typeof listParticipantsSchema>;
export type GetParticipantsInput = TypeOf<typeof getParticipantSchema>;
export type DeleteParticipantInput = TypeOf<typeof deleteParticipantSchema>['params'];
