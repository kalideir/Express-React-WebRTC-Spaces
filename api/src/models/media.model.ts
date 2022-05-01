import mongoose from 'mongoose';
import { MediaItem } from '../types';
import { resizeMediaProducer } from '../workers/producers';

export enum MediaTypes {
  PROFILE_PICTURE = 'PROFILE_PICTURE',
}
export interface MediaDocument extends MediaItem, mongoose.Document {}

const mediaSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: MediaTypes,
    },
    contentType: {
      // ~mimetype
      type: String,
    },
    originalUrl: {
      type: String,
    },
    thumbnailUrl: {
      type: String,
    },
    largeUrl: {
      type: String,
    },
    mediumUrl: {
      type: String,
    },
    smallUrl: {
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
    await resizeMediaProducer(doc);
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
