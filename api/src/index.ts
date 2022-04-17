import path from 'path';

if (process.env.NODE_ENV) {
  require('dotenv').config({
    path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}.local`),
  });
} else {
  require('dotenv').config();
}

import config from 'config';
import app from './app';
import { dbConnect, logger, validateEnv } from './utils';

validateEnv();

const PORT = config.get<number>('port');

app.listen(PORT, async () => {
  await dbConnect();

  logger.info(`App started at http://localhost:${PORT}`);
});
