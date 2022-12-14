import { Divider, List, SwipeableDrawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface DrawerProps {
  open: boolean;
  onClose(): void;
  onOpen(): void;
  children: React.ReactNode;
}

const useStyles = makeStyles({
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
});

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
