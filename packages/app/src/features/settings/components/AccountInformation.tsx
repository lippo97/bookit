import { QueryContent } from '@/components/QueryContent';
import { useQuery } from 'react-query';
import { getAccount } from '../api/account';

function AccountInformation() {
  const { data, status } = useQuery('getUserInformation', getAccount);
  return (
    <QueryContent status={status} data={data}>
      {(d) => (
        <>
          <p>{d.firstName}</p>
          <p>{d.secondName}</p>
        </>
      )}
    </QueryContent>
  );
}

export default AccountInformation;
