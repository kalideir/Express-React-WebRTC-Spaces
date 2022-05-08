import mongoose from 'mongoose';

export interface ParticipantInput {
  userId: string;
  spaceId: string;
  type: keyof typeof ParticipantTypes;
}

export enum ParticipantTypes {
  HOST = 'HOST',
  GUEST = 'GUEST',
  SPEAKER = 'SPEAKER',
  PENDING = 'PENDING',
}

export interface ParticipantDocument extends ParticipantInput, mongoose.Document {}

const participantSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ParticipantTypes,
      default: ParticipantTypes.GUEST,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    spaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Space',
    },
  },
  {
    timestamps: true,
    collection: 'Participant',
    minimize: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        const newRet = { ...ret };
        return newRet;
      },
    },
  },
);

participantSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

const ParticipantModel = mongoose.model<ParticipantDocument>('Participant', participantSchema);

export { ParticipantModel };
