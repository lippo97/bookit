import { LinkIconButton } from '@/components/LinkIconButton';
import { WithId } from '@asw-project/shared/data/withId';
import { Room } from '@asw-project/shared/generatedTypes';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RoomIcon from '@material-ui/icons/Room';
import { Link as RouterLink } from 'react-router-dom';

interface RoomListItemProps {
  data: WithId<Room>;
}

export const RoomListItem = ({
  data: { name, capacity, libraryId, _id },
}: RoomListItemProps) => (
  <ListItem button component={RouterLink} to="#">
    <ListItemIcon>
      <RoomIcon />
    </ListItemIcon>
    <ListItemText primary={name} secondary={`Available seats: ${capacity}`} />
    <ListItemSecondaryAction>
      <LinkIconButton
        to={`/dashboard/libraries/${libraryId}/rooms/${_id}/edit`}
        icon={<EditIcon />}
      />
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);
