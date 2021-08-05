import { ErrorMap, ExpectedError } from '@asw-project/shared/errors';
import { ReturnedUser } from '../returnedUser';

export type LoginErrorKind = 'WrongEmailPassword';

export const LoginErrors: ErrorMap<LoginErrorKind> = {
  WrongEmailPassword: 'WrongEmailPassword',
};

export type LoginSuccess = ReturnedUser;

export type LoginFail = ExpectedError<LoginErrorKind>;

export const wrongEmailPassword: LoginFail = {
  kind: 'WrongEmailPassword',
  message: 'Wrong email or password.',
} as const;
