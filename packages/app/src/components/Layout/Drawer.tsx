import {
  Divider,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { To } from 'history';
import { Link as RouterLink } from 'react-router-dom';

interface DrawerProps {
  open: boolean;
  onClose(): void;
  onOpen(): void;
  children: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 256,
  },
  listItem: {
    display: 'flex',
  },
  listItemContent: {
    fontSize: '18px',
    marginLeft: '5px',
  },
}));

export function Drawer({ children, open, onClose, onOpen }: DrawerProps) {
  const classes = useStyles();
  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawer,
      }}
      onOpen={onOpen}
      onClose={onClose}
    >
      <Divider />
      <List>{children}</List>
    </SwipeableDrawer>
  );
}
