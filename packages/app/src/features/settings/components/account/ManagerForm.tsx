import { useNotification } from '@/stores/notifications';
import { ManagerAccountRequestSchema } from '@asw-project/shared/data/requests/accountCreation/request';
import { ManagerAccountRequest } from '@asw-project/shared/generatedTypes/requests/accountCreation/request';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { updateManagerAccount } from '../../api/account';

export const ManagerForm = () => {
  const navigate = useNavigate();
  const { pushNotification } = useNotification();
  const {
    register,
    handleSubmit,
    formState: {
      errors: { businessName: errors },
    },
  } = useForm<ManagerAccountRequest>({
    resolver: joiResolver(ManagerAccountRequestSchema),
    defaultValues: {
      businessName: '',
    },
  });

  const onSubmit = handleSubmit((data) =>
    updateManagerAccount(data)
      .then(() => {
        pushNotification({
          message: 'Account information updated successfully!',
          severity: 'success',
        });
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
        pushNotification({
          message: 'There was as error, retry later.',
          severity: 'error',
        });
      }),
  );

  const { ref, ...registerProps } = register('businessName');

  return (
    <form onSubmit={onSubmit}>
      <TextField
        fullWidth
        label="Business Name"
        {...registerProps}
        inputRef={ref}
        style={{ marginBottom: 32 }}
        error={!!errors}
        helperText={errors?.message}
      />
      <Button fullWidth type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};
