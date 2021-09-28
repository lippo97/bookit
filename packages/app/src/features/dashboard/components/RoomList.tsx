import { Button } from '@/components/Button';
import { WithId } from '@asw-project/shared/data/withId';
import { Link as RouterLink } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import RoomIcon from '@material-ui/icons/Room';
import AddIcon from '@material-ui/icons/Add';
import { Room } from '@asw-project/shared/generatedTypes/room';
import {
  List,
  Paper,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { RoomListItem } from './RoomListItem';

interface RoomListProps {
  readonly rooms: readonly Room[];
}

const useStyles = makeStyles((theme) => ({
  list: {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  },
  button: {
    textTransform: 'none',
  },
}));

export const RoomList = ({ rooms }: RoomListProps) => {
  const classes = useStyles();
  return (
    <List className={classes.list} component={Paper}>
      <ListSubheader>Rooms</ListSubheader>
      {rooms.map((d) => (
        <RoomListItem data={d} />
      ))}
      <ListSubheader>Actions</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText>Add new room</ListItemText>
      </ListItem>
    </List>
  );
};
