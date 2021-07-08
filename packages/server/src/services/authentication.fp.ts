import {
  LoginFail,
  LoginResponse,
  LoginSuccess,
} from '@asw-project/shared/dto/authentication/login';
import { Email, Password } from '@asw-project/shared/types/authentication';
import { Either, EitherAsync, Maybe, Right } from 'purify-ts';
import User from '../models/User';

const wrongEmailPassword: LoginFail = {
  error: {
    kind: 'WrongEmailPassword',
    description: 'Wrong email or password',
  },
};

export function logon(email: Email, password: Password): EitherAsync<LoginFail, LoginSuccess> {
  return EitherAsync<LoginFail, any>(() => User.findOne({ email }).exec()).chain((user) => {
    const either: Either<LoginFail, LoginSuccess> = Maybe.fromNullable(user)
      .toEither(wrongEmailPassword)
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .map(({ email }) => ({ email }));
    return Promise.resolve(either);
  });
}
