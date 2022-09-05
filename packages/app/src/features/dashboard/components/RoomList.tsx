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
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import CropFreeIcon from '@material-ui/icons/CropFree';
import { WithId } from '@asw-project/shared/data/withId';
import { RoomListItem } from './RoomListItem';

interface RoomListProps {
  readonly libraryId: string;
  readonly libraryName: string;
  readonly rooms: readonly WithId<Room>[];
  refetch(): void;
}

const useStyles = makeStyles((theme) => ({
  list: {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  },
}));

export const RoomList = ({
  rooms,
  libraryId,
  libraryName,
  refetch,
}: RoomListProps) => {
  const classes = useStyles();
  return (
    <List className={classes.list} component={Paper}>
      <ListSubheader>Rooms</ListSubheader>

      {rooms.length > 0 ? (
        rooms.map((d) => (
          <RoomListItem
            key={d._id}
            data={d}
            refetch={refetch}
            libraryName={libraryName}
          />
        ))
      ) : (
        <ListItem>
          <ListItemText>(No rooms yet)</ListItemText>
        </ListItem>
      )}

      {}
      <ListSubheader>Actions</ListSubheader>
      <ListItem
        button
        component={RouterLink}
        to={`/dashboard/libraries/${libraryId}/rooms/add?libraryName=${libraryName}`}
      >
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText>Add new room</ListItemText>
      </ListItem>
    </List>
  );
};
