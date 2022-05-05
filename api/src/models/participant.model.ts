import mongoose from 'mongoose';

export interface ParticipantInput {
  userId: string;
  type: keyof typeof ParticipantTypes;
}

export enum ParticipantTypes {
  HOST = 'HOST',
  GUEST = 'GUEST',
  SPEAKER = 'SPEAKER',
}

export interface ParticipantDocument extends ParticipantInput, mongoose.Document {}

const spaceSchema = new mongoose.Schema(
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

spaceSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

const ParticipantModel = mongoose.model<ParticipantDocument>('Participant', spaceSchema);

export { ParticipantModel };
