import {
  AccountCreationOrUpdateFail,
  AccountCreationOrUpdateSuccess,
} from '@asw-project/shared/data/requests/accountCreation/response';
import { unexpectedError } from '@asw-project/shared/errors';

import { always, EitherAsync, Left } from 'purify-ts';
import {
  Account,
  Authentication,
} from '@asw-project/shared/generatedTypes/authentication';
import { SimpleFindById, SimpleUpdate } from '@asw-project/resources/routes';

import { ObjectId } from 'mongodb';
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
): EitherAsync<AccountCreationOrUpdateFail, any> {
  return EitherAsync(async () => userId !== undefined)
    .map(() =>
      new SimpleFindById(AuthenticationModel).findById(new ObjectId(userId)),
    )
    .mapLeft((err: any) => unexpectedError(err));
  // .map((obj) => obj.ifRight((o) => o.account));
}
