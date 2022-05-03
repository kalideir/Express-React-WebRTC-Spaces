import { MediaTypes, SpaceStatus } from '../constants';

export type NewTokenData = {
  refreshToken: string;
};

export type AuthData = {
  email: string;
  password: string;
};

export type RegisterData = AuthData & { username: string };

export type RegisterResponse = { message: string };

export type VerifyUserData = {
  verificationCode: null | string;
};

export type ProfilePicture = MediaResponse;
export interface IUser {
  id: string;
  _id: string;
  email: string;
  profilePictureId: string;
  profilePicture: ProfilePicture;
  username: string;
  fullName: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  address: string;
  active: boolean;
  verified: boolean;
  createdAt: string;
}

export type LoginResponse = {
  user: IUser;
  refreshToken: string;
  message: string;
};

export type ForgotPasswordData = Pick<LoginData, 'email'>;

export type ResetPasswordData = {
  password: string;
  passwordConfirmation: stirng;
  passwordResetCode: string;
};

export type ResendVerificationData = Pick<LoginData, 'email'>;

export type MessageResponse = { message: string };

export type LoginData = AuthData;

export type AutoLoginResponse = Pick<LoginResponse, 'user'>;

export type Error = {
  path: string;
  message: string;
};

export type ErrorPayload = {
  errors?: Error[];
  message?: string;
  extra: unknown;
};

export interface ISpace {
  name: string;
  participants: string[];
  url: string;
  isPublic: boolean;
}

export type UpdateProfileData = Partial<IUser>;

export type MediaTypesKey = keyof typeof MediaTypes;

export type MediaData = Partial<{
  type: MediaTypesKey;
  contentType: string;
  originalUrl: string;
  largeUrl: string;
  mediumUrl: string;
  smallUrl: string;
}>;

export type MediaResponse = Partial<{
  createdAt: Date;
  updatedAt: Date;
  id: string;
}> &
  MediaData;

export type NewSpaceData = Omit<ISpace, 'participants'>;

export type NewSpaceResponse = ISpace;

export type SpaceData = {
  title: string;
  isPublic: boolean;
};

export type SpaceItem = {
  title: string;
  isPublic: boolean;
  key: string;
  participants: string[];
  participantIds: string[];
  status: keyof typeof SpaceStatus;
  id?: string;
};

export type NavItem = { name: string; to: string };

export type SpaceUser = {
  id: string;
  profilePicture: ProfilePicture;
  username: string;
  fullName: string;
};
