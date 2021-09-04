import { Drawer as MuiDrawer, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

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
