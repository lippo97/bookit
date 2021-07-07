import { plainToClass } from 'class-transformer';
import { validate as classValidator } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

type Class<A> = { new (...params: any[]): A };

const validate =
  <T extends object>(dtoClass: Class<T>) =>
  async (req: Request<any, T>, res: Response, next: NextFunction) => {
    const obj = plainToClass(dtoClass, req.body);
    const errors = await classValidator(obj);
    if (errors.length > 0) {
      res.send(StatusCodes.BAD_REQUEST);
    }
    next();
  };

export default validate;
