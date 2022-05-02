import mongoose from 'mongoose';

export interface SpaceInput {
  title: string;
  key: string;
  isPublic: boolean;
  status: keyof typeof SpaceStatus;
  participantIds: string[];
}

export enum SpaceStatus {
  CREATED = 'CREATED',
  STARTED = 'STARTED',
  ENDED = 'ENDED',
  HIDDEN = 'HIDDEN',
}

export interface SpaceDocument extends SpaceInput, mongoose.Document {}

const spaceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: SpaceStatus,
      default: SpaceStatus.CREATED,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    participantIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }],
  },
  {
    timestamps: true,
    collection: 'Space',
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

spaceSchema.virtual('owner', {
  ref: 'User',
  localField: 'ownerId',
  foreignField: '_id',
  justOne: true,
});

spaceSchema.virtual('participants', {
  ref: 'Participant',
  localField: 'participantIds',
  foreignField: '_id',
});

const SpaceModel = mongoose.model<SpaceDocument>('Space', spaceSchema);

export { SpaceModel };
