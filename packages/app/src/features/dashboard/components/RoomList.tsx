import { Room } from '@asw-project/shared/generatedTypes/room';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  Paper,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CropFreeIcon from '@material-ui/icons/CropFree';
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
      <ListItem button>
        <ListItemIcon>
          <CropFreeIcon />
        </ListItemIcon>
        <ListItemText>Check-in</ListItemText>
      </ListItem>
    </List>
  );
};
