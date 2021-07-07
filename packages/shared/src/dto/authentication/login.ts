import { IsDefined, IsEmail } from 'class-validator';
import { Email, Password } from '../../types/authentication';
import Error from './error';

export class LoginRequest {
  @IsEmail()
  @IsDefined()
  public readonly email!: Email;

  @IsDefined()
  public readonly password!: Password;
}

type Kind = 'BlockedUser' | 'WrongEmailPassword';

export interface LoginSuccess {
  readonly email: Email;
}

export interface LoginFail {
  readonly error: Error<Kind>;
}

export type LoginResponse = LoginSuccess | LoginFail;

export function isLoginSuccess(dto: LoginResponse): dto is LoginSuccess {
  return (dto as LoginSuccess).email !== undefined;
}

export function isLoginFail(dto: LoginResponse): dto is LoginFail {
  return !isLoginSuccess(dto);
}
