import { Job } from 'bull';
import { resizeMediaQueue } from '..';
import { MediaItem } from '../../types';

export default function (media: MediaItem) {
  const opts = {
    attempts: 1,
  };
  resizeMediaQueue.add(media, opts);
}
