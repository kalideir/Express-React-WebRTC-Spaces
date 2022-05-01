/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { HttpError } from 'http-errors';
import { logger, t } from '../utils';
import { CustomError } from '../errors';

const error = (error: HttpError, req: Request, res: Response, next: NextFunction) => {
  logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${error.status}, Message:: ${error.message}`);
  if (error instanceof HttpError) {
    return res.status(error.status).json({ message: error.message });
  }
  if (error instanceof CustomError) {
    return res.status(error.status).json({ message: error.message, extra: error.extra });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: t('something_went_wrong') });
};

export default error;
