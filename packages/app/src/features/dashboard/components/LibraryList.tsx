import { WithId } from '@asw-project/shared/data/withId';
import { Library } from '@asw-project/shared/generatedTypes';
import { Link as RouterLink } from 'react-router-dom';
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
import { LibraryListItem } from './LibraryListItem';

interface LibraryListProps {
  readonly data: WithId<Library>[];
  refetch(): void;
}

const useStyles = makeStyles((theme) => ({
  list: {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  },
}));

export const LibraryList = ({ data, refetch }: LibraryListProps) => {
  const classes = useStyles();
  return (
    <List className={classes.list} component={Paper}>
      <ListSubheader>Libraries</ListSubheader>
      {data.map((d) => (
        <LibraryListItem data={d} refetch={refetch} />
      ))}
      <ListSubheader>Actions</ListSubheader>
      <ListItem button component={RouterLink} to="/dashboard/libraries/add">
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText>Add new library</ListItemText>
      </ListItem>
      <ListItem
        button
        component={RouterLink}
        to="/dashboard/reservations/confirm"
      >
        <ListItemIcon>
          <CropFreeIcon />
        </ListItemIcon>
        <ListItemText>Check-in</ListItemText>
      </ListItem>
    </List>
  );
};
