import {
  Button,
  Divider,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { LocationDescriptor } from 'history';

interface DrawerProps {
  open: boolean;

  onClose(): void;
}

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 250,
  },
  linkText: {
    color: 'inherit',
    textDecoration: 'none',
  },
}));

function Drawer({ open, onClose }: DrawerProps) {
  const classes = useStyles();
  return (
    <MuiDrawer
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawer,
      }}
      onClose={onClose}
    >
      <List>
        <ListItem button component={RouterLink} to="/secret">
          <ListItemText>Example</ListItemText>
        </ListItem>
        <ListItem button component={RouterLink} to="/profile">
          <ListItemText>Profile</ListItemText>
        </ListItem>
        <Divider />
        <ListItem button component={RouterLink} to="/logout">
          <ListItemText>Log out</ListItemText>
        </ListItem>
      </List>
    </MuiDrawer>
  );
}

export default Drawer;
