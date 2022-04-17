import Queue from 'bull';

import config from 'config';

const redisUrl = config.get<string>('redisUrl');

export const sendMailQueue = new Queue('email', redisUrl);
