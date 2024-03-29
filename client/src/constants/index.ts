export * from './env';
export const MIC_ACCESS_GRANTED = 'MIC_ACCESS_GRANTED';

export enum MediaTypes {
  PROFILE_PICTURE = 'PROFILE_PICTURE',
}

export enum SpaceStatus {
  CREATED = 'CREATED',
  STARTED = 'STARTED',
  ENDED = 'ENDED',
  HIDDEN = 'HIDDEN',
}

export enum ParticipantTypes {
  PENDING = 'PENDING',
  GUEST = 'GUEST',
  SPEAKER = 'SPEAKER',
  HOST = 'HOST',
}

export * from './socketTypes';
