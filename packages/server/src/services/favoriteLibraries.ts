import { FavoriteLibrariesNotAvailableKind } from '@asw-project/shared/data/requests/favoriteLibraries/response';
import { Error, ExpectedError } from '@asw-project/shared/errors';
import { UnauthorizedKind } from '@asw-project/shared/errors/kinds';

import { EitherAsync, Left, MaybeAsync, Right } from 'purify-ts';
import { SimpleFindById } from '@asw-project/resources/routes';

import { ObjectId } from 'mongodb';
import { isTrue } from '@asw-project/shared/util/boolean';
import { FindByIdError } from '@asw-project/resources/routes/operations/FindById';
import { Library } from '@asw-project/shared/generatedTypes';
import { AuthenticationModel } from '../models/Authentication';
import { LibraryService } from './libraries';

export function getFavoriteLibraries(
  userId: string | undefined,
): EitherAsync<
  Error<FavoriteLibrariesNotAvailableKind | FindByIdError>,
  Library[]
> {
  return MaybeAsync(() => Promise.resolve(userId !== undefined))
    .filter(isTrue)
    .void()
    .toEitherAsync<ExpectedError<UnauthorizedKind>>({
      kind: 'UnauthorizedError',
    })
    .chain(() =>
      new SimpleFindById(AuthenticationModel).findById(new ObjectId(userId)),
    )
    .chain((res) =>
      new LibraryService().findAll({ _id: { $in: res.favoriteLibraries } }),
    )

    .chain((libs) => {
      if (libs) {
        return EitherAsync.liftEither(Right(libs));
      }

      return EitherAsync.liftEither(
        Left({
          kind: 'InternalError',
          body: new Error('Unexpected error in getFavoriteLibraries'),
        } as const),
      );
    });
}

/* export async function getFavoriteLibraries(
  userId: string | undefined,
): EitherAsync<
  Error<FavoriteLibrariesNotAvalaibleKind | FindByIdError>,
  string[]
> {
  return MaybeAsync(() => Promise.resolve(userId !== undefined))
  .filter(isTrue)
  .void()
  .toEitherAsync<UnexpectedError>({
    kind: 'InternalError',
    body: new Error('Unexpected error in createAccount'),
  })
  .chain(() =>
    new SimpleUpdate(AuthenticationModel).update(
      new ObjectId(userId),
      newAccount,
    ),
  )
  .chain((res) => {
    if (res) {
      return EitherAsync.liftEither(Right(newAccount.account));
    }
    return EitherAsync.liftEither(
      Left({
        kind: 'InternalError',
        body: new Error('Operation failed on account'),
      }),
    );
  });
} */
