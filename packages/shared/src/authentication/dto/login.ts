import { IsDefined, IsEmail } from 'class-validator';
import { ErrorMap, ExpectedError } from '../../errors';
import { Email, Password, ReturnedUser } from '../types';

export class LoginRequest {
  @IsEmail()
  @IsDefined()
  public readonly email!: Email;

  @IsDefined()
  public readonly password!: Password;
}

export type LoginErrorKind = 'WrongEmailPassword';

export const LoginErrors: ErrorMap<LoginErrorKind> = {
  WrongEmailPassword: 'WrongEmailPassword',
};

export type LoginSuccess = ReturnedUser;
// export interface LoginSuccess {
//   readonly email: Email;
//   readonly error?: never;
// }

export type LoginFail = ExpectedError<LoginErrorKind>;

export type LoginResponse = LoginSuccess | LoginFail;

export function isLoginSuccess(dto: LoginResponse): dto is LoginSuccess {
  return (dto as LoginSuccess).email !== undefined;
}

export function isLoginFail(dto: LoginResponse): dto is LoginFail {
  return !isLoginSuccess(dto);
}

export const wrongEmailPassword: LoginFail = {
  kind: 'WrongEmailPassword',
  message: 'Wrong email or password.',
} as const;
