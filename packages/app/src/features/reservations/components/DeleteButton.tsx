import { DialogButton } from '@/components/DialogButton';
import { useNotification } from '@/stores/notifications';
import { Button } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { FC, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { deleteReservation } from '../api/reservations';

interface DeleteButtonProps {
  readonly status: 'success' | 'error' | 'idle' | 'loading';
  readonly disabled: boolean;
  readonly id: string;
}

export const DeleteButton: FC<DeleteButtonProps> = ({
  status,
  id,
  disabled,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { pushNotification } = useNotification();
  const { mutateAsync } = useMutation(() => deleteReservation(id));
  const onConfirmDelete = () =>
    mutateAsync()
      // eslint-disable-next-line no-restricted-globals
      .then(() => {
        navigate('/reservations');
      })
      .then(() =>
        pushNotification({
          message: `Deleted reservation successfully.`,
          severity: 'info',
        }),
      )
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        pushNotification({
          message: `Unable to delete reservation, retry later.`,
          severity: 'error',
        });
      });

  const Content: React.FC = () => {
    if (status === 'loading') {
      return <Skeleton variant="rect" height={36} />;
    }
    if (status === 'error') {
      return <></>;
    }
    return (
      <DialogButton
        id="delete-reservation"
        title="Delete reservation?"
        description="Are you sure you want to delete this reservation?"
        autoClose
        isOpen={isDialogOpen}
        setOpen={setDialogOpen}
        onConfirm={onConfirmDelete}
        as={Button}
        fullWidth
        color="secondary"
        variant="outlined"
        disabled={disabled}
      >
        Delete
      </DialogButton>
    );
  };

  return <Content />;
};
