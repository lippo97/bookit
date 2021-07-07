import { isLoginSuccess, LoginRequest } from '@asw-project/shared/dto/authentication/login';
import { isSignupSuccess, SignupRequest } from '@asw-project/shared/dto/authentication/signup';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as authenticationService from '../services/authentication';

export async function login(req: Request<any, any, LoginRequest>, res: Response): Promise<void> {
  const { email, password } = req.body;
  const result = await authenticationService.login(email, password);
  if (isLoginSuccess(result)) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { email } = result;
    res.json({ email });
  }
  res.send(StatusCodes.UNAUTHORIZED);
}

export async function signin(
  req: Request<any, any, SignupRequest>,
  res: Response,
): Promise<Response | void> {
  const { email, password, passwordConfirmation } = req.body;
  const result = await authenticationService.signup(email, password, passwordConfirmation);
  if (isSignupSuccess(result)) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { email } = result;
    return res.status(StatusCodes.CREATED).json({ email });
  }
  const { error } = result;
  return res.status(400).json({ error });
}
