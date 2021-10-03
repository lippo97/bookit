import { QueryContent } from '@/components/QueryContent';
import { useQuery } from 'react-query';
import { isUserAccount } from '@asw-project/shared/types/account';
import { getAccount } from '../api/account';

function AccountInformation() {
  const { data, status } = useQuery('getUserInformation', getAccount);
  return (
    <QueryContent status={status} data={data}>
      {(d) => {
        if (isUserAccount(d)) {
          return (
            <>
              <p>d.firstName</p>
              <p>d.secondName</p>
            </>
          );
        }
        return (
          <>
            <p>d.businessName</p>
          </>
        );
      }}
    </QueryContent>
  );
}

export default AccountInformation;
