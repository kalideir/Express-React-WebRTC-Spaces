import { ParticipantDocument, ParticipantModel, SpaceDocument, SpaceInput, SpaceModel } from '../models';
import { FilterQuery } from 'mongoose';
import { ParticipantStatus, StatusKeys } from '../types';
import { UpdateSpaceInput } from '../schema';

export async function setSpaceStatus(key: string, ownerId: string, status: StatusKeys) {
  let space = await updateSpace({ key, ownerId }, { status, startedAt: new Date() });
  space = await (await space.populate('participants')).populate({ path: 'participants', populate: { path: 'user' } });
  return { space: space.toJSON(), message: 'Space is started.' };
}

export async function joinSpace(key: string, userId: string, type: ParticipantStatus) {
  let space = await findSpace({ key });
  const isParticipant = await findParticipant({ userId, spaceId: space.id });
  if (isParticipant) {
    return;
  }
  const input = { type, userId, spaceId: space.id };
  const participant = await ParticipantModel.create(input);
  space.participantIds.push(participant.id);
  await space.save();
  space = await (await space.populate('participants')).populate({ path: 'participants', populate: { path: 'user' } });
  return { space: space.toJSON(), message: 'You joined successfully.' };
}

export async function switchType(key: string, userId: string, type: ParticipantStatus) {
  let space = await findSpace({ key });
  const participant = await findParticipant({ userId, spaceId: space.id });
  if (!participant) {
    return { message: 'Not found' };
  }
  await participant.update({ type });
  space = await (await space.populate('participants')).populate({ path: 'participants', populate: { path: 'user' } });
  return { space: space.toJSON(), message: 'Participant was added.' };
}

export async function findSpace(query: FilterQuery<SpaceDocument>) {
  return SpaceModel.findOne(query);
}

export function findSpaceById(id: string) {
  return SpaceModel.findById(id);
}

export async function updateSpace({ query }: FilterQuery<SpaceInput>, input: UpdateSpaceInput['body']) {
  const space = await SpaceModel.findOneAndUpdate(query, { ...input }, { new: true });
  console.log({ space, query });

  return await space.save();
}

export async function updateSpaceById(id, input: UpdateSpaceInput['body']) {
  const space = await SpaceModel.findByIdAndUpdate(id, { ...input }, { new: true });
  console.log({ space, id });

  return await space.save();
}

export function findParticipant(query: FilterQuery<ParticipantDocument>) {
  return ParticipantModel.findOne(query);
}
