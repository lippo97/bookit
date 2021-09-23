import { AccountResponse } from '@asw-project/shared/data/requests/account';
import {
  UserAccountRequest,
  AccountRequest,
} from '@asw-project/shared/src/generatedTypes/requests/account';

export const getAccount = (): Promise<AccountRequest> =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          firstName: 'Mario',
          secondName: 'Rossi',
          maleFemale: 'male',
          birthDate: new Date(),
        }),
      2000,
    ),
  );

export const createUserAccount = (
  data: UserAccountRequest,
): Promise<AccountResponse> =>
  new Promise((resolve) => setTimeout(resolve, 2000));

export const updateUserAccount = (
  data: UserAccountRequest,
): Promise<AccountResponse> => Promise.resolve();
