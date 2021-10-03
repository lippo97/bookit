import { QueryContent } from '@/components/QueryContent';
import { UserAccountRequestSchema } from '@asw-project/shared/data/requests/accountCreation/request';
import { UserAccountRequest } from '@asw-project/shared/generatedTypes/requests/accountCreation/request';
import { isUserAccount } from '@asw-project/shared/types/account';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getAccount, updateUserAccount } from '../../api/account';
import { handleAccountSubmit } from '../../lib/handleAccountSubmit';
import { UserForm } from './UserForm';

interface EditUserAccountFormProps {}

export const EditUserAccountForm = ({}: EditUserAccountFormProps) => {
  const navigate = useNavigate();
  const { control, handleSubmit, setValue } = useForm<UserAccountRequest>({
    resolver: joiResolver(UserAccountRequestSchema),
    defaultValues: {
      firstName: '',
      secondName: '',
      birthDate: new Date(),
      maleFemale: 'male',
    },
  });
  const { status, data } = useQuery('getUserAccount', getAccount, {
    onSuccess: (account) => {
      if (isUserAccount(account)) {
        setValue('firstName', account.firstName);
        setValue('secondName', account.secondName);
        setValue('maleFemale', account.maleFemale);
        setValue('birthDate', account.birthDate);
      }
    },
  });
  const { mutateAsync } = useMutation(updateUserAccount);

  return (
    <QueryContent status={status} data={data}>
      {() => (
        <UserForm
          control={control}
          onSubmit={handleAccountSubmit(handleSubmit, mutateAsync, () =>
            navigate('/settings/account'),
          )}
        />
      )}
    </QueryContent>
  );
};
