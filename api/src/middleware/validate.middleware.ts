import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AnyZodObject } from 'zod';
import { logger } from '../utils';

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (e) {
    logger.debug(e);
    return res.status(httpStatus.BAD_REQUEST).send(e.errors.map(e => ({ message: e.message, path: e.validation })));
  }
};

export default validate;
