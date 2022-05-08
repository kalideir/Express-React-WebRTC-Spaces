import { ParticipantModel, SpaceDocument, SpaceModel } from '../models';
import { FilterQuery } from 'mongoose';
import { ParticipantStatus, StatusKeys } from '../types';
import { UpdateSpaceInput } from '../schema';

export async function setSpaceStatus(key: string, status: StatusKeys) {
  return await updateSpace(key, { status });
}

export async function joinSpace(key: string, userId: string, type: ParticipantStatus) {
  let space = await findSpace({ key });

  const input = { type, userId };
  const participant = await ParticipantModel.create(input);
  space.participantIds.push(participant.id);
  await space.save();
  space = await (await space.populate('participants')).populate({ path: 'participants', populate: { path: 'user' } });
  return { space: space.toJSON(), message: 'You joined successfully.' };
}

export async function findSpace(query: FilterQuery<SpaceDocument>) {
  return SpaceModel.findOne(query);
}

export function findSpaceById(id: string) {
  return SpaceModel.findById(id);
}

export async function updateSpace(key: string, input: UpdateSpaceInput['body']) {
  const space = await SpaceModel.findOneAndUpdate({ key }, { ...input }, { new: true });
  return await space.save();
}
