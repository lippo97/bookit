import { UserAccount, ManagerAccount } from '../generatedTypes';
import { Account } from '../generatedTypes/authentication';

export function isUserAccount(account: Account): account is UserAccount {
  return account.type === 'user';
}

export function isManagerAccount(account: Account): account is ManagerAccount {
  return !isUserAccount(account);
}
