import { UninitializedAccountKind } from '@asw-project/shared/data/requests/accountCreation/response';
import { Error, UnexpectedError } from '@asw-project/shared/errors';

import { EitherAsync, Left, MaybeAsync, Right } from 'purify-ts';
import { SimpleFindById, SimpleUpdate } from '@asw-project/resources/routes';

import { ObjectId } from 'mongodb';
import { Account } from '@asw-project/shared/generatedTypes';
import { isTrue } from '@asw-project/shared/util/boolean';
import { FindByIdError } from '@asw-project/resources/routes/operations/FindById';
import { EditError } from '@asw-project/resources/routes/operations/Update';
import { AuthenticationModel } from '../models/Authentication';

export function updateAccount(
  userId: string | undefined,
  accountInfo: any,
): EitherAsync<Error<EditError>, Account> {
  const newAccount: any = {
    account: accountInfo,
  };
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
}

export function getAccount(
  userId: string | undefined,
): EitherAsync<Error<UninitializedAccountKind | FindByIdError>, Account> {
  return MaybeAsync(() => Promise.resolve(userId !== undefined))
    .filter(isTrue)
    .void()
    .toEitherAsync<UnexpectedError>({
      kind: 'InternalError',
      body: new Error('Unexpected error in getAccount'),
    })
    .chain(() =>
      new SimpleFindById(AuthenticationModel).findById(new ObjectId(userId)),
    )
    .chain(({ account }) => {
      if (account) {
        return EitherAsync.liftEither(Right(account));
      }
      return EitherAsync.liftEither(
        Left({
          kind: 'UninitializedAccountError',
        } as const),
      );
    });
}
