import {
  LoginErrorKind,
  LoginErrors,
} from '@asw-project/shared/authentication/dto/login';
import {
  SignupErrorKind,
  SignupErrors,
} from '@asw-project/shared/authentication/dto/signup';
import { Error } from '@asw-project/shared/errors';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DocumentCreationError } from '../services/resources/operations/documentCreation';
import { FindByIdError } from '../services/resources/operations/FindById';

type ApplicationError =
  | LoginErrorKind
  | SignupErrorKind
  | DocumentCreationError
  | FindByIdError;

export function handleResponse(
  err: any,
  _: Request,
  res: Response,
  next: NextFunction,
) {
  function isError(_err: any): _err is Error<ApplicationError> {
    return 'kind' in _err;
  }

  // eslint-disable-next-line consistent-return
  function matchError(_err: Error<ApplicationError>): number {
    // eslint-disable-next-line default-case
    switch (_err.kind) {
      case LoginErrors.WrongEmailPassword:
        return StatusCodes.UNAUTHORIZED;
      case SignupErrors.DuplicateEmail:
        return StatusCodes.CONFLICT;
      case SignupErrors.PasswordsDoNotMatch:
        return StatusCodes.BAD_REQUEST;
      case 'InternalError':
      default:
        return StatusCodes.INTERNAL_SERVER_ERROR;
    }
  }

  if (isError(err)) {
    const statusCode = matchError(err);
    if (statusCode !== StatusCodes.INTERNAL_SERVER_ERROR) {
      return res.status(statusCode).json(err);
    }
  }
  res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  return next(err);
}

export function logError(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // eslint-disable-next-line no-console
  console.error(err);
  next(err);
}
