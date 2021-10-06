import { UserAccountRequestSchema } from '@asw-project/shared/data/requests/accountCreation/request';
import { UserAccount } from '@asw-project/shared/generatedTypes/userAccount';
import { UserAccountRequest } from '@asw-project/shared/generatedTypes/requests/accountCreation/request';
import { joiResolver } from '@hookform/resolvers/joi';
import { To } from 'history';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { updateUserAccount } from '../../api/account';
import { handleAccountSubmit } from '../../lib/handleAccountSubmit';
import { UserForm } from './UserForm';

interface AddUserAccountFormProps {
  onSuccessNavigate?: To;
}

export const AddUserAccountForm = ({
  onSuccessNavigate,
}: AddUserAccountFormProps) => {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation<void, Error, UserAccountRequest, unknown>(
    updateUserAccount,
  );
  const { control, handleSubmit } = useForm<UserAccountRequest>({
    resolver: joiResolver(UserAccountRequestSchema),
    defaultValues: {
      firstName: '',
      secondName: '',
      birthDate: new Date(),
      maleFemale: 'male',
    },
  });

  return (
    <UserForm
      control={control}
      onSubmit={handleAccountSubmit(handleSubmit, mutateAsync, () =>
        navigate(onSuccessNavigate ?? '/'),
      )}
    />
  );
};
