import { DialogButton } from '@/components/DialogButton';
import { LinkIconButton } from '@/components/LinkIconButton';
import { useNotification } from '@/stores/notifications';
import { WithId } from '@asw-project/shared/data/withId';
import { Room } from '@asw-project/shared/generatedTypes';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import AccessibleIcon from '@material-ui/icons/Accessible';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GridOnIcon from '@material-ui/icons/GridOn';
import RoomIcon from '@material-ui/icons/Room';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Link as RouterLink } from 'react-router-dom';
import { deleteRoom } from '../api/rooms';

interface RoomListItemProps {
  data: WithId<Room>;
  libraryName: string;
  // refetch(): void;
}

export const RoomListItem = ({
  data: { name, capacity, libraryId, _id, accessibility },
  libraryName,
}: RoomListItemProps) => {
  const [isOpen, setOpen] = useState(false);
  const { mutateAsync } = useMutation(() => deleteRoom(_id));
  const pushNotification = useNotification((s) => s.pushNotification);

  return (
    <ListItem button component={RouterLink} to="#">
      <ListItemIcon>
        <RoomIcon />
      </ListItemIcon>
      <ListItemText
        primary={name}
        secondary={
          <>
            Available seats: {capacity}{' '}
            {accessibility && (
              <>
                {' '}
                · accessible{' '}
                <AccessibleIcon
                  style={{
                    fontSize: '1rem',
                    marginBottom: -2,
                  }}
                />
              </>
            )}
          </>
        }
      />
      <ListItemSecondaryAction>
        <LinkIconButton
          to={`/dashboard/libraries/${libraryId}/rooms/${_id}/floormap`}
          icon={<GridOnIcon />}
        />
        <LinkIconButton
          to={`/dashboard/libraries/${libraryId}/rooms/${_id}/edit?libraryName=${libraryName}`}
          icon={<EditIcon />}
        />
        <DialogButton
          as={IconButton}
          title={`Delete ${name}?`}
          description={`Are you sure you want to delete ${name}?`}
          id={_id}
          isOpen={isOpen}
          setOpen={setOpen}
          onConfirm={() =>
            mutateAsync()
              // eslint-disable-next-line no-restricted-globals
              .then(refetch)
              .then(() =>
                pushNotification({
                  message: `Deleted ${name} successfully.`,
                  severity: 'info',
                }),
              )
              .catch((err) => {
                console.error(err);
                pushNotification({
                  message: `Unable to delete ${name}, retry later.`,
                  severity: 'error',
                });
              })
              .finally(() => setOpen(false))
          }
        >
          <DeleteIcon />
        </DialogButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
