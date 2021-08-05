import { LoginErrorKind } from '@asw-project/shared/data/authentication/login/response';
import { SignupErrorKind } from '@asw-project/shared/data/authentication/signup/response';
import { Error } from '@asw-project/shared/errors';
import { AllBaseErrors } from '@asw-project/shared/errors/kinds';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

type ApplicationError = LoginErrorKind | SignupErrorKind | AllBaseErrors;

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
      case 'WrongEmailPassword':
        return StatusCodes.UNAUTHORIZED;
      case 'DuplicateIdentifier':
        return StatusCodes.CONFLICT;
      case 'CastError':
      case 'ValidationError':
      case 'BodyParseError':
        return StatusCodes.BAD_REQUEST;
      case 'NotFound':
        return StatusCodes.NOT_FOUND;
      case 'InternalError':
        // default:
        return StatusCodes.INTERNAL_SERVER_ERROR;
    }
  }

  // Handle user defined errors
  if (isError(err)) {
    const statusCode = matchError(err);
    if (statusCode !== StatusCodes.INTERNAL_SERVER_ERROR) {
      return res.status(statusCode).json(err);
    }
  }
  // Handle express.json() error
  if (err.name === 'SyntaxError') {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
  // Handle unrecognized error
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
