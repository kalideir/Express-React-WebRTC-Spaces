import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AnyZodObject } from 'zod';
import { logger } from '../utils';

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body, req.params, req.query, 'xxxs=');
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (e) {
    logger.debug(e);
    console.log(e, 17);
    return res.status(httpStatus.BAD_REQUEST).send({ errors: e.errors.map(e => ({ path: e.path[1] || e.path[0], message: e.message })) });
  }
};

export default validate;
