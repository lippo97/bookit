import { ky } from '@/config/ky';
import {
  UserAccountRequest,
  ManagerAccountRequest,
} from '@asw-project/shared/generatedTypes/requests/accountCreation/request';
import { Account } from '@asw-project/shared/generatedTypes/authentication';
import {
  ManagerAccount,
  UserAccount,
} from '@asw-project/shared/generatedTypes';

export const getAccount = (): Promise<Account> =>
  ky.get('account').json<Account>();

export const createUserAccount = (
  data: UserAccountRequest,
): Promise<UserAccount> =>
  ky.post('account/userAccount', { json: data }).json();

export const updateUserAccount = (
  data: UserAccountRequest,
): Promise<UserAccount> =>
  ky.patch('account/userAccount', { json: data }).json();

export const createManagerAccount = (
  data: ManagerAccountRequest,
): Promise<ManagerAccount> =>
  ky.post('account/managerAccount', { json: data }).json();

export const updateManagerAccount = (
  data: ManagerAccountRequest,
): Promise<ManagerAccount> =>
  ky.patch('account/managerAccount', { json: data }).json();
