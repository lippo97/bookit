// import { AccountResponse } from '@asw-project/shared/data/requests/accountCreation/request';
import ky from 'ky';
import {
  UserAccountRequest,
  ManagerAccountRequest,
} from '@asw-project/shared/generatedTypes/requests/accountCreation/request';
import { Account } from '@asw-project/shared/generatedTypes/authentication';

export const getAccount = (): Promise<Account> =>
  ky.get('account').json<Account>();

// export const createUserAccount = (data: UserAccountRequest): Promise<Account> =>
// ky.post('userAccount', { json: data }).json<Account>();
export const createUserAccount = (data: any): Promise<void> =>
  ky.post('userAccount', { json: data }).json();

// export const updateUserAccount = (data: UserAccountRequest): Promise<Account> =>
// ky.patch('userAccount', { json: data }).json<Account>();
export const updateUserAccount = (data: any): Promise<void> =>
  ky.patch('userAccount', { json: data }).json();

export const createManagerAccount = (
  data: ManagerAccountRequest,
): Promise<Account> =>
  ky.post('managerAccount', { json: data }).json<Account>();

export const updateManagerAccount = (
  data: ManagerAccountRequest,
): Promise<Account> =>
  ky.patch('managerAccount', { json: data }).json<Account>();
