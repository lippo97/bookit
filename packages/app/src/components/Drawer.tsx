import {
  Button,
  Divider,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Power } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { LocationDescriptor } from 'history';

interface DrawerProps {
  open: boolean;

  onClose(): void;

  children: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 250,
  },
  listItem: {
    display: 'flex',
  },
  listItemContent: {
    fontSize: '18px',
    marginLeft: '5px',
  },
}));

export const DrawerItem = ({
  content,
  icon,
  to,
}: {
  to: string;
  content: string;
  icon?: React.ReactNode;
}) => {
  const classes = useStyles();

  return (
    <ListItem
      button
      component={RouterLink}
      to={to}
      className={classes.listItem}
    >
      {icon || ''}
      <span className={classes.listItemContent}>{content}</span>
    </ListItem>
  );
};
export function Drawer({ children, open, onClose }: DrawerProps) {
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
      <List>{children}</List>
    </MuiDrawer>
  );
}

// <ListItem button component={RouterLink} to="/secret">
//   <ListItemText>Example</ListItemText>
// </ListItem>
// <ListItem button component={RouterLink} to="/profile">
//   <ListItemText>Profile</ListItemText>
// </ListItem>
// <Divider />
// <ListItem button component={RouterLink} to="/logout">
//   <ListItemText>Log out</ListItemText>
// </ListItem>
