import { IsDefined, IsEmail, MinLength } from 'class-validator';
import { Email } from '../../types/authentication';
import { Error } from './error';

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

type Kind = 'DuplicateEmail' | 'PasswordsDoNotMatch';

export interface SignupSuccess {
  readonly email: Email;
}

export interface SignupFail {
  readonly error: Error<Kind>;
}

export type SignupResponse = SignupSuccess | SignupFail;

export function isSignupSuccess(dto: SignupResponse): dto is SignupSuccess {
  return (dto as SignupSuccess).email !== undefined;
}

export function isSignupFail(dto: SignupResponse): dto is SignupFail {
  return !isSignupSuccess(dto);
}

export const passwordsDoNotMatch = {
  error: {
    kind: 'PasswordsDoNotMatch',
  },
} as const;

export const duplicateEmail = {
  error: {
    kind: 'DuplicateEmail',
  },
} as const;
