import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export function logError(err: any, req: Request, res: Response, next: NextFunction) {
  // eslint-disable-next-line no-console
  console.error(err);
  next(err);
}

export function handleResponse(err: any, req: Request, res: Response, next: NextFunction) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  next(err);
}
