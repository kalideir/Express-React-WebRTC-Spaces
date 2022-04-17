import mongoose from 'mongoose';

export interface MediaDocument extends mongoose.Document {
  type: string;
  originalUrl: string;
  thumbnaillUrl: string;
  mediumUrl: string;
  largelUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const mediaSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    originalUrl: {
      type: String,
    },
    thumbnailUrl: {
      type: String,
    },
    mediumUrl: {
      type: String,
    },
    largeUrl: {
      type: String,
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

const MediaModel = mongoose.model<MediaDocument>('Media', mediaSchema);

export { MediaModel };
