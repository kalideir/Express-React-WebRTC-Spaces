import * as redis from 'redis';
import { logger } from '.';
import config from 'config';

const redisUrl = config.get<string>('redisUrl');

export const redisClient = redis.createClient({
  url: redisUrl,
});

(async () => {
  redisClient.connect();
})();

redisClient.on('error', function (error) {
  logger.error(error);
});

export const setValue = (key: string, value: unknown) => key && redisClient.set(key, JSON.stringify(value));

export const getValue = async (key: string) => {
  // console.log({ key });

  const value = (await redisClient.get(key || '')) || 'null';
  return JSON.parse(value);
};
