import { LinkIconButton } from '@/components/LinkIconButton';
import { WithId } from '@asw-project/shared/data/withId';
import { Library } from '@asw-project/shared/generatedTypes';
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
<<<<<<< HEAD
  TableRow as MuiTableRow,
=======
>>>>>>> master
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
<<<<<<< HEAD
=======
import { useState } from 'react';
import { useMutation } from 'react-query';
>>>>>>> master
import { Link as RouterLink } from 'react-router-dom';
import BusinessIcon from '@material-ui/icons/Business';

interface LibraryListItemProps {
  readonly data: WithId<Library>;
  refetch(): void;
}

<<<<<<< HEAD
const TableRow = styled(MuiTableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const FlexDiv = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-evenly',
}));

/* const Actions = ({ _id, name }: Pick<WithId<Library>, '_id' | 'name'>) => {
  const navigate = useNavigate();
=======
export const LibraryListItem = ({
  data: { name, city, street, _id },
  refetch,
}: LibraryListItemProps) => {
>>>>>>> master
  const [isOpen, setOpen] = useState(false);
  const { mutateAsync } = useMutation<Library, Error, void, unknown>(() =>
    deleteLibrary(_id),
  );
  const pushNotification = useNotification((s) => s.pushNotification);
  return (
    <ListItem button component={RouterLink} to={`/dashboard/libraries/${_id}`}>
      <ListItemIcon>
        <BusinessIcon />
      </ListItemIcon>
      <ListItemText primary={name} secondary={`${street}, ${city}`} />
      <ListItemSecondaryAction>
        <LinkIconButton
          to={`/dashboard/libraries/${_id}/edit`}
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
<<<<<<< HEAD
}; */

export const LibraryListItem = ({
  data: { name, city, street, _id },
}: LibraryListItemProps) => (
  <ListItem button component={RouterLink} to={`/dashboard/libraries/${_id}`}>
    <ListItemIcon>
      <BusinessIcon />
    </ListItemIcon>
    <ListItemText primary={name} secondary={`${street}, ${city}`} />
    <ListItemSecondaryAction>
      <LinkIconButton
        to={`/dashboard/libraries/${_id}/edit`}
        icon={<EditIcon />}
      />
      <LinkIconButton
        to={`/dashboard/libraries/${_id}/del`}
        icon={<DeleteIcon />}
      />
    </ListItemSecondaryAction>
  </ListItem>
);
=======
};
>>>>>>> master
