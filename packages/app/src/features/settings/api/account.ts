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
import { useAuth } from '@/stores/authentication';

export const getAccount = (): Promise<Account> =>
  ky.get('account').json<Account>();

export const updateUserAccount = (data: UserAccountRequest): Promise<void> => {
  const { updateAccount } = useAuth.getState();
  return ky
    .post('account/userAccount', { json: data })
    .json<UserAccount>()
    .then(updateAccount);
};

export const updateManagerAccount = (
  data: ManagerAccountRequest,
): Promise<void> => {
  const { updateAccount } = useAuth.getState();
  return ky
    .post('account/managerAccount', { json: data })
    .json<ManagerAccount>()
    .then(updateAccount);
};
