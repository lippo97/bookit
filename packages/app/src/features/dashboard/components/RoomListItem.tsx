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
  data: Room;
}

export const RoomListItem = ({
  data: { name, capacity },
}: RoomListItemProps) => (
  <ListItem button component={RouterLink} to="#">
    <ListItemIcon>
      <RoomIcon />
    </ListItemIcon>
    <ListItemText primary={name} secondary={`Available seats: ${capacity}`} />
    <ListItemSecondaryAction>
      <IconButton>
        <EditIcon />
      </IconButton>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);
