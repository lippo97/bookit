import { DialogButton } from '@/components/DialogButton';
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
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { deleteLibrary } from '../api/getBuildings';

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
  const { mutateAsync } = useMutation<void, Error, void, unknown>(() =>
    deleteLibrary(_id),
  );
  return (
    <FlexDiv>
      <Tooltip title="Manage">
        <IconButton>
          <BusinessIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <DialogButton
          as={IconButton}
          title={`Delete ${name}?`}
          description={`Are you sure you want to delete ${name}?`}
          id={_id}
          // eslint-disable-next-line no-restricted-globals
          onConfirm={() => mutateAsync().then(() => location.reload())}
        >
          <DeleteIcon />
        </DialogButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton
          onClick={() => navigate(`/dashboard/libraries/${_id}/edit`)}
        >
          <EditIcon />
        </IconButton>
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
