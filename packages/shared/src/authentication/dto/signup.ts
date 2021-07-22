import { IsDefined, IsEmail, MinLength } from 'class-validator';
import { ErrorMap, Error } from '../../errors';
import { ReturnedUser } from '../types';

export class SignupRequest {
  @IsDefined()
  @IsEmail()
  public readonly email!: string;

  @IsDefined()
  @MinLength(7)
  public readonly password!: string;

  @IsDefined()
  @MinLength(7)
  public readonly passwordConfirmation!: string;
}

export type SignupErrorKind = 'DuplicateEmail' | 'PasswordsDoNotMatch';

export const SignupErrors: ErrorMap<SignupErrorKind> = {
  DuplicateEmail: 'DuplicateEmail',
  PasswordsDoNotMatch: 'PasswordsDoNotMatch',
};

export type SignupSuccess = ReturnedUser;
// export interface SignupSuccess {
//   readonly email: Email;
// }

export type SignupFail = Error<SignupErrorKind>;

export type SignupResponse = SignupSuccess | SignupFail;

export function isSignupSuccess(dto: SignupResponse): dto is SignupSuccess {
  return (dto as SignupSuccess).email !== undefined;
}

export function isSignupFail(dto: SignupResponse): dto is SignupFail {
  return !isSignupSuccess(dto);
}

export const passwordsDoNotMatch = {
  kind: 'PasswordsDoNotMatch',
} as const;

export const duplicateEmail = {
  kind: 'DuplicateEmail',
} as const;
