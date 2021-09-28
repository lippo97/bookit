import { DialogButton } from '@/components/DialogButton';
import { LinkIconButton } from '@/components/LinkIconButton';
import { useNotification } from '@/stores/notifications';
import { WithId } from '@asw-project/shared/data/withId';
import { Library } from '@asw-project/shared/generatedTypes';
import {
  IconButton,
  TableCell,
  TableRow as MuiTableRow,
  Tooltip,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import BusinessIcon from '@material-ui/icons/Business';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { deleteLibrary } from '../api/getLibraries';

interface LibraryListItemProps {
  readonly data: WithId<Library>;
}

const TableRow = styled(MuiTableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const FlexDiv = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-evenly',
}));

const Actions = ({ _id, name }: Pick<WithId<Library>, '_id' | 'name'>) => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const { mutateAsync } = useMutation<Library, Error, void, unknown>(() =>
    deleteLibrary(_id),
  );
  const pushNotification = useNotification((s) => s.pushNotification);
  return (
    <FlexDiv>
      <Tooltip title="Manage">
        <LinkIconButton
          to={`/dashboard/libraries/${_id}/manage`}
          icon={<BusinessIcon />}
        />
        {/* <IconButton>
          <BusinessIcon />
        </IconButton> */}
      </Tooltip>
      <Tooltip title="Delete">
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
              .then(() => location.reload())
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
                setOpen(false);
              })
          }
        >
          <DeleteIcon />
        </DialogButton>
      </Tooltip>
      <Tooltip title="Edit">
        <LinkIconButton
          to={`/dashboard/libraries/${_id}/edit`}
          icon={<EditIcon />}
        />
      </Tooltip>
    </FlexDiv>
  );
};

export const LibraryListItem = ({
  data: { name, city, street, _id },
}: LibraryListItemProps) => (
  <TableRow>
    <TableCell>{name}</TableCell>
    <TableCell>{city}</TableCell>
    <TableCell>{street}</TableCell>
    <TableCell>
      <Actions name={name} _id={_id} />
    </TableCell>
  </TableRow>
);
