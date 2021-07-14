import { LoginRequest } from '@asw-project/shared/dto/authentication/login';
import { SignupRequest } from '@asw-project/shared/dto/authentication/signup';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as authenticationService2 from '../services/authentication.fp';

export async function login(req: Request<any, any, LoginRequest>, res: Response): Promise<void> {
  const { email, password } = req.body;
  const result = await authenticationService2.login(email, password);
  result.caseOf({
    // eslint-disable-next-line @typescript-eslint/no-shadow
    Right: (success) => {
      req.session.userId = success.email;
      return res.json(success);
    },
    Left: (fail) => res.status(StatusCodes.UNAUTHORIZED).json(fail),
  });
}

export async function signup(
  req: Request<any, any, SignupRequest>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { email, password, passwordConfirmation } = req.body;
  const result = await authenticationService2.signup(email, password, passwordConfirmation);
  result.caseOf({
    Right: (success) => res.status(StatusCodes.CREATED).json(success),
    Left: (fail) => {
      switch (fail.error.kind) {
        case 'InternalError':
          return next(fail.error.object);
        default:
          return res.status(StatusCodes.CONFLICT).json(fail);
      }
    },
  });
}
