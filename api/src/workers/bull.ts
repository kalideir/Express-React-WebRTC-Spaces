import Queue from 'bull';

import config from 'config';

const redisUrl = config.get<string>('redisUrl');

console.log(redisUrl);
export const sendMailQueue = new Queue('email', redisUrl, {
  defaultJobOptions: {
    removeOnComplete: true,
  },
});
