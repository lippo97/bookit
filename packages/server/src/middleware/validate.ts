import { Kinds } from '@asw-project/shared/errors/kinds';
import {
  Reason,
  ValidationError,
} from '@asw-project/shared/errors/ValidationError';
import { plainToClass } from 'class-transformer';
import {
  validate as classValidator,
  ValidationError as CvValidationError,
} from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';

type Class<A> = { new (...params: any[]): A };

function parseErrors(errors: CvValidationError[]): Reason[] {
  function parseOne(error: CvValidationError): Reason[] {
    const { property, value, constraints } = error;

    if (constraints === undefined) {
      return [];
    }

    return [
      {
        property,
        value,
        constraints,
      },
    ];
  }

  return _.flatMap(errors, parseOne);
}

const validate =
  <T extends object>(dtoClass: Class<T>) =>
  async (req: Request<any, any, T>, res: Response, next: NextFunction) => {
    const obj = plainToClass(dtoClass, req.body);
    if (obj === undefined) {
      return next({
        kind: Kinds.BodyParseError,
      });
      // return res.sendStatus(StatusCodes.BAD_REQUEST);
    }
    const errors = await classValidator(obj);
    if (errors.length > 0) {
      // return res.status(StatusCodes.BAD_REQUEST).json(errors);
      return next({
        kind: Kinds.ValidationError,
        reason: parseErrors(errors),
      });
    }
    return next();
  };

export default validate;
