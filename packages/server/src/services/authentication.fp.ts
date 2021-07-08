import {
  LoginFail,
  LoginResponse,
  LoginSuccess,
} from '@asw-project/shared/dto/authentication/login';
import { Email, Password } from '@asw-project/shared/types/authentication';
import { Either, EitherAsync, Maybe, Right } from 'purify-ts';
import User from '../models/User';

export function logon(email: Email, password: Password): EitherAsync<LoginFail, LoginSuccess> {
  EitherAsync(() => User.findOne({ email }).exec()).chain(
    (user) => {
      const either = Maybe.fromNullable(user).toEither({
        error: {
          kind: 'WrongEmailPassword',
          description: 'Wrong email or password',
        },
      });

      return Promise.resolve(
        Maybe.fromNullable(user).toEither({
          error: {
            kind: 'WrongEmailPassword',
            description: 'Wrong email or password',
          },
        }),
      );
    },
    // Promise.resolve(Either.of('ciao')),
  );
  //   return EitherAsync(async ({ liftEither, fromPromise, throwE }) => {
  //     const result = await User.findOne({ email }).exec();
  //     const user = Maybe.fromNullable(result)
  //       .toEither({
  //         error: {
  //           kind: 'WrongEmailPassword',
  //           description: 'Wrong email or password',
  //         },
  //       })
  //       // eslint-disable-next-line @typescript-eslint/no-shadow
  //       .map(({ email }) => ({ email }));

  //     return user;
  //   });
}

export function login(email: Email, password: Password): Promise<LoginResponse> {
  return User.findOne({ email })
    .exec()
    .then((user) => {
      if (user === null) {
        return {
          error: {
            kind: 'WrongEmailPassword',
            description: "The requested user couldn't be found",
          },
        };
      }
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { email } = user;
      return { email };
    });
}
