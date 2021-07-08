import { plainToClass } from 'class-transformer';
import { validate as classValidator } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

type Class<A> = { new (...params: any[]): A };

const validate =
  <T extends object>(dtoClass: Class<T>) =>
  async (req: Request<any, any, T>, res: Response, next: NextFunction) => {
    const obj = plainToClass(dtoClass, req.body);
    if (obj === undefined) {
      return res.sendStatus(StatusCodes.BAD_REQUEST);
    }
    const errors = await classValidator(obj);
    if (errors.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json(errors);
    }
    return next();
  };

export default validate;
