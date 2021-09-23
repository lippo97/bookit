import { useNotification } from '@/stores/notifications';
import { UserAccountRequest } from '@asw-project/shared/generatedTypes/requests/account';
import { BaseSyntheticEvent } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';

export const handleAccountSubmit = (
  handleSubmit: UseFormHandleSubmit<UserAccountRequest>,
  mutateAsync: (data: UserAccountRequest) => Promise<void>,
  onSuccess?: () => void | Promise<void>,
): ((e?: BaseSyntheticEvent<any, Event>) => Promise<void>) => {
  const { pushNotification } = useNotification.getState();

  return handleSubmit((data) =>
    mutateAsync(data)
      .then(() =>
        pushNotification({
          message: 'Account information updated successfully!',
          severity: 'success',
        }),
      )
      .then(onSuccess)
      .catch(() =>
        pushNotification({
          message: 'There was an error, retry later.',
          severity: 'error',
        }),
      ),
  );
};
