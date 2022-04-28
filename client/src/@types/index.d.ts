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
export interface IUser {
  id: string;
  _id: string;
  email: string;
  profilePicture: string;
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
}

export type UpdateProfileData = Partial<IUser>;

export type MediaResponse = Partial<{
  type: string;
  originalUrl: string;
  thumbnaillUrl: string;
  mediumUrl: string;
  largelUrl: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}>;
