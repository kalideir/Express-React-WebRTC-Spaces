import { SpaceDocument, SpaceModel } from '../models';
import { FilterQuery } from 'mongoose';
import { StatusKeys } from '../types';
import { UpdateSpaceInput } from '../schema';

export async function setSpaceStatus(key: string, status: StatusKeys) {
  return await updateSpace(key, { status });
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
