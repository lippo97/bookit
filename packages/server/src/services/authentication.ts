import {
  LoginFail,
  LoginSuccess,
  wrongEmailPassword,
} from '@asw-project/shared/authentication/dto/login';
import {
  duplicateEmail,
  passwordsDoNotMatch,
  SignupFail,
  SignupSuccess,
} from '@asw-project/shared/authentication/dto/signup';
import { Email, Password } from '@asw-project/shared/authentication/types';
import { always, EitherAsync, Maybe } from 'purify-ts';
import { unexpectedError } from '@asw-project/shared/errors';
import { isTrue } from '@asw-project/shared/util/boolean';
import { pick } from '@asw-project/shared/util/objects';
import { AuthenticationModel } from '../models/Authentication';

export function login(
  email: Email,
  password: Password,
): EitherAsync<LoginFail, LoginSuccess> {
  return AuthenticationModel.findByEmailAndComparePassword(email, password) //
    .map(pick('email'))
    .toEitherAsync(wrongEmailPassword);
}

export function signup(
  email: Email,
  password: Password,
  passwordConfirmation: Password,
): EitherAsync<SignupFail, SignupSuccess> {
  /* eslint-disable @typescript-eslint/no-shadow */
  const createUser = (
    email: Email,
    password: Password,
  ): EitherAsync<SignupFail, SignupSuccess> =>
    EitherAsync(() => AuthenticationModel.create({ email, password }))
      .map(pick('email'))
      .mapLeft((err: any) => {
        if (err.name === 'MongoError' && err.code === 11000) {
          return duplicateEmail;
        }
        // eslint-disable-next-line no-console
        return unexpectedError(err);
      });

  return EitherAsync.liftEither(
    Maybe.of(password === passwordConfirmation)
      .filter(isTrue)
      .toEither(passwordsDoNotMatch),
  ).chain(always(createUser(email, password)));
}
