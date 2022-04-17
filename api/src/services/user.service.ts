import { UserDocument, UserModel } from '../models';
import { UpdateUserInput } from '../schema';
import { FilterQuery } from 'mongoose';

export type CreateUserPartial = Partial<{
  email: string;
  password: string;
  role: string;
}>;

export async function createUser(input: Partial<CreateUserPartial>) {
  const user = await UserModel.create(input);
  return user.save();
}

export async function updateUser(id: string, input: UpdateUserInput['body']) {
  const user = await UserModel.findByIdAndUpdate(id, { ...input }, { new: true });
  return await user.save();
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query);
}

export async function findUsers(query: FilterQuery<UserDocument>) {
  return UserModel.find(query);
}

export function findUserById(id: string) {
  return UserModel.findById(id);
}

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}
