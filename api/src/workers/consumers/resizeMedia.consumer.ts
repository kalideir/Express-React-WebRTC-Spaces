import { logger } from '../../utils';
import { Job } from 'bull';
import type { ResizeMediaData } from '../../types';
import { resizeMedia } from '../../utils/media';

export default function consumer(job: Job<ResizeMediaData>) {
  return new Promise((resolve, reject) => {
    logger.debug('Resize media job data ' + JSON.stringify(job.data));
    try {
      resizeMedia(job);
      resolve(true);
    } catch (e) {
      logger.error(e);
      reject(e);
    }
  });
}
