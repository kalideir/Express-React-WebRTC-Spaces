import { Request } from 'express';
import morgan from 'morgan';
import { logger } from '.';

export const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

morgan.token('body', (req: Request) => JSON.stringify(req.body));

export const MORGAN_TOKENS = ':method :url :status :res[content-length] - :response-time ms :body';
