import {
  AccountCreationFail,
  AccountCreationSuccess,
} from '@asw-project/shared/data/requests/accountCreation/response';
import { unexpectedError } from '@asw-project/shared/errors';

import { always, EitherAsync } from 'purify-ts';
import { Account } from 'shared/src/data/requests/accountCreation/request';
import { SimpleUpdate } from '@asw-project/resources/routes';
import { AuthenticationModel } from '../models/Authentication';

export function createAccount(
  userId: any,
  account: Account,
): EitherAsync<AccountCreationFail, AccountCreationSuccess> {
  return EitherAsync(() =>
    new SimpleUpdate(AuthenticationModel).update(userId, account as any),
  )
    .map(always(undefined))
    .mapLeft((err: any) => unexpectedError(err));
}
