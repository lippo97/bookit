import { LoginRequest } from '@asw-project/shared/authentication/dto/login';
import { SignupRequest } from '@asw-project/shared/authentication/dto/signup';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as authenticationService from '../services/authentication';

export async function login(
  req: Request<any, any, LoginRequest>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { email, password } = req.body;
  const result = await authenticationService.login(email, password);
  result.caseOf({
    // eslint-disable-next-line @typescript-eslint/no-shadow
    Right: (success) => {
      req.session.userId = success.email;
      return res.json(success);
    },
    Left: next,
  });
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.session;
  if (userId !== undefined) {
    return req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      return res.sendStatus(StatusCodes.RESET_CONTENT);
    });
  }
  return res.sendStatus(StatusCodes.NOT_FOUND);
}

export async function signup(
  req: Request<any, any, SignupRequest>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { email, password, passwordConfirmation } = req.body;
  const result = await authenticationService.signup(email, password, passwordConfirmation);
  result.caseOf({
    Right: (success) => res.status(StatusCodes.CREATED).json(success),
    Left: next,
  });
}
