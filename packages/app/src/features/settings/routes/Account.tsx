import { useAuth } from '@/stores/authentication';
import { AddAccount } from './AddAccount';
import { EditAccount } from './EditAccount';

export const Account = () => {
  // eslint-disable-next-line no-underscore-dangle
  const account = useAuth.getState().auth?.account;

  if (account === undefined) return <AddAccount />;

  return <EditAccount />;
};
