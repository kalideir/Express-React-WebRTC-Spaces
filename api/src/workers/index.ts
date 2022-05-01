import Queue from 'bull';
import config from 'config';
import { resizeMediaConsumer, sendEmailConsumer } from './consumers';

const redisUrl = config.get<string>('redisUrl');

export const maxJobsPerWorker = 4;

export const sendMailQueue = new Queue('email', redisUrl, {
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
  },
});

export const resizeMediaQueue = new Queue('media', redisUrl, {
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
  },
});

sendMailQueue.process(maxJobsPerWorker, sendEmailConsumer);

resizeMediaQueue.process(maxJobsPerWorker, resizeMediaConsumer);
