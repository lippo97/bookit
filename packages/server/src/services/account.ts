import {
  AccountCreationOrUpdateFail,
  UninitializedAccountKind,
} from '@asw-project/shared/data/requests/accountCreation/response';
import {
  Error,
  UnexpectedError,
  unexpectedError,
} from '@asw-project/shared/errors';

import { EitherAsync, Left, MaybeAsync, Right } from 'purify-ts';
import { SimpleFindById, SimpleUpdate } from '@asw-project/resources/routes';

import { ObjectId } from 'mongodb';
import { Account, Authentication } from '@asw-project/shared/generatedTypes';
import { Error } from 'mongoose';
import { isTrue } from '@asw-project/shared/util/boolean';
import { FindByIdError } from '@asw-project/resources/routes/operations/FindById';
import { AuthenticationModel } from '../models/Authentication';

export function createAccount(
  userId: string | undefined,
  accountInfo: any,
): EitherAsync<AccountCreationOrUpdateFail, any> {
  const account: any = {
    account: accountInfo,
  };
  return EitherAsync(async () => userId !== undefined)
    .map(
      () =>
        new SimpleUpdate(AuthenticationModel).update(
          new ObjectId(userId),
          account,
        ),
      // .ifRight((obj) => obj.account),
    )
    .mapLeft((err: any) => unexpectedError(err));
}

export function getAccount(
  userId: string | undefined,
): EitherAsync<Error<UninitializedAccountKind | FindByIdError>, Account> {
  return MaybeAsync(() => Promise.resolve(userId === undefined))
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
          kind: 'UninitializedAccountKind',
        } as const),
      );
    });
}
