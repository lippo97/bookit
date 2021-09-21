/* eslint-disable @typescript-eslint/naming-convention */
import {
  LoginFail,
  LoginSuccess,
  wrongEmailPassword,
} from '@asw-project/shared/data/authentication/login/response';
import {
  duplicateIdentifier,
  SignupFail,
  SignupSuccess,
} from '@asw-project/shared/data/authentication/signup/response';
import { unexpectedError } from '@asw-project/shared/errors';
import {
  Email,
  Password,
} from '@asw-project/shared/generatedTypes/authentication';
import { always, EitherAsync } from 'purify-ts';
import { AuthenticationModel } from '../models/Authentication';

export function login(
  email: Email,
  password: Password,
): EitherAsync<LoginFail, LoginSuccess> {
  return AuthenticationModel.findByEmailAndComparePassword(email, password) //
    .toEitherAsync(wrongEmailPassword);
}

export function signup(
  email: Email,
  password: Password,
): EitherAsync<SignupFail, SignupSuccess> {
  return EitherAsync(() => AuthenticationModel.create({ email, password }))
    .map(always(undefined))
    .mapLeft((err: any) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        return duplicateIdentifier;
      }
      return unexpectedError(err);
    });
}
