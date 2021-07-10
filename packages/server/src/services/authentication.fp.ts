import {
  LoginFail,
  LoginSuccess,
  wrongEmailPassword,
} from '@asw-project/shared/dto/authentication/login';
import {
  duplicateEmail,
  passwordsDoNotMatch,
  SignupFail,
  SignupSuccess,
} from '@asw-project/shared/dto/authentication/signup';
import { Email, Password } from '@asw-project/shared/types/authentication';
import { always, EitherAsync, Maybe } from 'purify-ts';
import { InternalError } from '@asw-project/shared/dto/authentication/error';
import { isTrue } from '@asw-project/shared/util/boolean';
import { pick } from '@asw-project/shared/util/objects';
import User from '../models/User';

export function login(email: Email, password: Password): EitherAsync<LoginFail, LoginSuccess> {
  return User.findByEmailAndComparePassword(email, password) //
    .map(pick('email'))
    .toEitherAsync(wrongEmailPassword);
}

export function signup(
  email: Email,
  password: Password,
  passwordConfirmation: Password,
): EitherAsync<SignupFail, SignupSuccess> {
  /* eslint-disable @typescript-eslint/no-shadow */
  const createUser = (email: Email, password: Password): EitherAsync<SignupFail, SignupSuccess> =>
    EitherAsync(() => User.create({ email, password }))
      .map(pick('email'))
      .mapLeft((err: any) => {
        if (err.name === 'MongoError' && err.code === 11000) {
          return duplicateEmail;
        }
        // eslint-disable-next-line no-console
        return InternalError(err);
      });

  return EitherAsync.liftEither(
    Maybe.of(password === passwordConfirmation)
      .filter(isTrue)
      .toEither(passwordsDoNotMatch),
  ).chain(always(createUser(email, password)));
}
