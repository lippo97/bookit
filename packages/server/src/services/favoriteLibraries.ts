import { FavoriteLibrariesNotAvailableKind } from '@asw-project/shared/data/requests/favoriteLibraries/response';
import { Error, ExpectedError } from '@asw-project/shared/errors';
import { UnauthorizedKind } from '@asw-project/shared/errors/kinds';

import { EitherAsync, Left, MaybeAsync, Right } from 'purify-ts';
import {
  FindAll,
  SimpleFindById,
  SimpleUpdate,
} from '@asw-project/resources/routes';

import { ObjectId } from 'mongodb';
import { isTrue } from '@asw-project/shared/util/boolean';
import { FindByIdError } from '@asw-project/resources/routes/operations/FindById';
import {
  Account,
  FavoriteLibrariesInfo,
  Library,
} from '@asw-project/shared/generatedTypes';
import { QueryOptions } from 'mongoose';
import { EditError } from '@asw-project/resources/routes/operations/Update';
import { isUserAccount } from '@asw-project/shared/types/account';
import { WithId } from '@asw-project/shared/data/withId';
import { AuthenticationModel } from '../models/Authentication';
import { LibraryModel } from '../models/Library';

export function getFavoriteLibraries(
  userId: string | undefined,
  account: Account | undefined,
  options?: Pick<QueryOptions, 'skip' | 'limit'>,
): EitherAsync<
  Error<FavoriteLibrariesNotAvailableKind | FindByIdError>,
  WithId<Library>[]
> {
  return MaybeAsync(() =>
    Promise.resolve(
      userId !== undefined && account !== undefined && isUserAccount(account),
    ),
  )
    .filter(isTrue)
    .void()
    .toEitherAsync<ExpectedError<UnauthorizedKind>>({
      kind: 'UnauthorizedError',
    })
    .chain(() =>
      new SimpleFindById(AuthenticationModel).findById(new ObjectId(userId)),
    )
    .chain((res) =>
      new FindAll(LibraryModel).findAll(
        { _id: { $in: res.favoriteLibraries } },
        undefined,
        options,
      ),
    )

    .chain((libs: any) => {
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

export function getFavoriteLibrariesInfo(
  userId: string | undefined,
  account: Account | undefined,
) {
  return MaybeAsync(() =>
    Promise.resolve(
      userId !== undefined && account !== undefined && isUserAccount(account),
    ),
  )
    .filter(isTrue)
    .void()
    .toEitherAsync<ExpectedError<UnauthorizedKind>>({
      kind: 'UnauthorizedError',
    })
    .chain(() =>
      new SimpleFindById(AuthenticationModel).findById(new ObjectId(userId)),
    )
    .chain((res) =>
      new FindAll(LibraryModel).findAll(
        { _id: { $in: res.favoriteLibraries } },
        undefined,
      ),
    )

    .chain((libs: any) => {
      if (libs) {
        // eslint-disable-next-line no-underscore-dangle
        return EitherAsync.liftEither(
          Right(
            libs.map(
              (x: any) =>
                // eslint-disable-next-line no-underscore-dangle
                ({ libraryId: x._id, name: x.name } as FavoriteLibrariesInfo),
            ),
          ),
        );
      }

      return EitherAsync.liftEither(
        Left({
          kind: 'InternalError',
          body: new Error('Unexpected error in getFavoriteLibraries'),
        } as const),
      );
    });
}

function operationOnFavoriteLibrary(
  userId: string | undefined,
  account: Account | undefined,
  libraryId: string,
  op: (array: string[]) => string[],
): EitherAsync<Error<EditError>, string[]> {
  let updatedFavoriteLibraries: any = {};
  return MaybeAsync(() =>
    Promise.resolve(
      userId !== undefined && account !== undefined && isUserAccount(account),
    ),
  )
    .filter(isTrue)
    .void()
    .toEitherAsync<ExpectedError<UnauthorizedKind>>({
      kind: 'UnauthorizedError',
    })
    .chain(() =>
      new SimpleFindById(AuthenticationModel).findById(new ObjectId(userId)),
    )
    .chain((info) => {
      let favoriteLibraries: string[] = [];
      if (info && info.favoriteLibraries) {
        favoriteLibraries = info.favoriteLibraries;
      }
      favoriteLibraries = op(favoriteLibraries);

      updatedFavoriteLibraries = {
        favoriteLibraries,
      };

      return new SimpleUpdate(AuthenticationModel).update(
        new ObjectId(userId),

        [{ $set: updatedFavoriteLibraries }],
      );
    })
    .chain((res) => {
      if (res) {
        return EitherAsync.liftEither(Right(updatedFavoriteLibraries));
      }
      return EitherAsync.liftEither(
        Left({
          kind: 'InternalError',
          body: new Error('Operation failed on favorite library'),
        }),
      );
    });
}

export function addFavoriteLibrary(
  userId: string | undefined,
  account: Account | undefined,
  libraryId: string,
): EitherAsync<Error<EditError>, string[]> {
  return operationOnFavoriteLibrary(userId, account, libraryId, (array) =>
    array.find((e) => e === libraryId) ? array : [...array, libraryId],
  );
}

export function deleteFavoriteLibrary(
  userId: string | undefined,
  account: Account | undefined,
  libraryId: string,
): EitherAsync<Error<EditError>, string[]> {
  return operationOnFavoriteLibrary(userId, account, libraryId, (array) =>
    array.filter((lib) => lib !== libraryId),
  );
}
