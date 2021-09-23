import { UserAccountRequestSchema } from '@asw-project/shared/data/requests/account';
import { UserAccountRequest } from '@asw-project/shared/generatedTypes/requests/account';
import { joiResolver } from '@hookform/resolvers/joi';
import { To } from 'history';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { createUserAccount } from '../../api/account';
import { handleAccountSubmit } from '../../lib/handleAccountSubmit';
import { UserForm } from './UserForm';

interface AddUserAccountFormProps {
  onSuccessNavigate?: To;
}

export const AddUserAccountForm = ({
  onSuccessNavigate,
}: AddUserAccountFormProps) => {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation(createUserAccount);
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
