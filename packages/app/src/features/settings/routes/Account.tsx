import { AddAccount } from './AddAccount';
import { EditAccount } from './EditAccount';

export const Account = () => {
  // eslint-disable-next-line no-underscore-dangle
  const account = undefined;

  if (account === undefined) return <AddAccount />;

  return <EditAccount />;
};
