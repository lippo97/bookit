import { AccountCreationOrUpdateFail } from '@asw-project/shared/data/requests/accountCreation/response';
import { unexpectedError } from '@asw-project/shared/errors';

import { EitherAsync } from 'purify-ts';
import { SimpleFindById, SimpleUpdate } from '@asw-project/resources/routes';

import { ObjectId } from 'mongodb';
import { Account, Authentication } from '@asw-project/shared/generatedTypes';
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
): EitherAsync<AccountCreationOrUpdateFail, Account> {
  return EitherAsync<AccountCreationOrUpdateFail, boolean>(
    async () => userId !== undefined,
  )
   .chain<AccountCreationOrUpdateFail,Authentication>(
    
        new SimpleFindById(AuthenticationModel).findById(new ObjectId(userId));
      
    )/*.chainLeft((err: any) => unexpectedError(err))
    .map((obj) => obj.account!)
    .mapLeft((err: any) => unexpectedError(err));*/
}
