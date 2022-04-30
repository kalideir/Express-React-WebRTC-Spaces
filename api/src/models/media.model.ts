import mongoose from 'mongoose';

export enum MediaTypes {
  PROFILE_PICTURE = 'PROFILE_PICTURE',
}

export interface MediaDocument extends mongoose.Document {
  type: MediaTypes;
  thumbnaillUrl: string;
  mediumUrl: string;
  largelUrl: string;
  smallUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const mediaSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: MediaTypes,
    },
    thumbnailUrl: {
      type: String,
    },
    largeUrl: {
      type: String,
    },
    smallUrl: {
      type: String,
    },
    mediumUrl: {
      type: String,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    collection: 'Media',
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

mediaSchema.post('save', async doc => {
  if (doc.createdAt === doc.updatedAt) {
    // await jobService.mediaCreated(doc);
  }
});

mediaSchema.virtual('owner', {
  ref: 'User',
  localField: 'ownerId',
  foreignField: '_id',
  justOne: true,
});

const MediaModel = mongoose.model<MediaDocument>('Media', mediaSchema);

export { MediaModel };
