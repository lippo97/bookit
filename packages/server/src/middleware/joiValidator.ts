import {
  Schema,
  ValidationError as JoiValidationError,
  ValidationErrorItem,
} from 'joi';
import { Request, Response, NextFunction } from 'express';
import {
  Reason,
  ValidationError,
} from '@asw-project/shared/errors/ValidationError';
import flatMap from 'lodash/flatMap';
import { IS_DEVELOPMENT } from '../config/constants';

function parseError({ details }: JoiValidationError): ValidationError {
  function parseOne({ context, type, message }: ValidationErrorItem): Reason[] {
    if (context && context.value && context.key) {
      const { value, key: property } = context;
      return [
        {
          property,
          value,
          constraints: {
            [type]: message,
          },
        },
      ];
    }
    return [];
  }

  return {
    kind: 'ValidationError',
    reason: flatMap(details, parseOne),
  };
}

export const validate =
  (schema: Schema) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, {
        warnings: IS_DEVELOPMENT,
      });
      next();
    } catch (err) {
      if (err.name === 'ValidationError') {
        return next(parseError(err as JoiValidationError));
      }
      next(err);
    }
  };
