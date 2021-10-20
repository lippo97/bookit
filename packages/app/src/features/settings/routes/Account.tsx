import { useAuth } from '@/stores/authentication';
import { AddAccount } from './AddAccount';
import { EditAccount } from './EditAccount';

export const Account = () => {
  const account = useAuth((s) => s.auth?.account);
  if (account === undefined) return <AddAccount />;

  return <EditAccount />;
};
