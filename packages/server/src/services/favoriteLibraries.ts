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
        { _id: { $in: res.favoriteLibrariesInfo!.map((l) => l.libraryId) } }, // user account check done above
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
        { _id: { $in: res.favoriteLibrariesInfo!.map((l) => l.libraryId) } },
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
  op: (array: FavoriteLibrariesInfo[]) => FavoriteLibrariesInfo[],
): EitherAsync<Error<EditError>, FavoriteLibrariesInfo[]> {
  let favoriteLibrariesInfo: FavoriteLibrariesInfo[] = [];
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
      if (info && info.favoriteLibrariesInfo) {
        favoriteLibrariesInfo = info.favoriteLibrariesInfo;
      }
      favoriteLibrariesInfo = op(favoriteLibrariesInfo);

      return new SimpleUpdate(AuthenticationModel).update(
        new ObjectId(userId),

        [{ $set: { favoriteLibrariesInfo } }],
      );
    })
    .chain((res) => {
      if (res) {
        return EitherAsync.liftEither(Right(favoriteLibrariesInfo));
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
  name: string,
): EitherAsync<Error<EditError>, FavoriteLibrariesInfo[]> {
  return operationOnFavoriteLibrary(userId, account, (array) =>
    array.find((lib) => lib.libraryId === libraryId)
      ? array
      : [...array, { libraryId, name }],
  );
}

export function deleteFavoriteLibrary(
  userId: string | undefined,
  account: Account | undefined,
  libraryId: string,
): EitherAsync<Error<EditError>, FavoriteLibrariesInfo[]> {
  return operationOnFavoriteLibrary(userId, account, (array) =>
    array.filter((lib) => lib.libraryId !== libraryId),
  );
}
