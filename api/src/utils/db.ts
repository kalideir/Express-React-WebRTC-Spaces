import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

function connect() {
  const dbURI = config.get('dbURI') as string;

  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', (collection, method, query, doc) => {
      logger.info(`${collection}.${method}`, JSON.stringify(query), doc);
    });
  }

  return mongoose
    .connect(dbURI, { authSource: 'admin', directConnection: true })
    .then(() => {
      logger.info('Database connected');
    })
    .catch(error => {
      logger.error(error);
      process.exit(1);
    });
}

export default connect;
