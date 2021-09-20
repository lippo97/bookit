import { useState } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import ExitToApp from '@material-ui/icons/ExitToApp';
import LockIcon from '@material-ui/icons/Lock';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { makeStyles, styled } from '@material-ui/core/styles';

import { useIsLoggedIn } from '@/stores/authentication';
import { AppBar, AppBarProps } from './AppBar';
import { Drawer, DrawerItem } from './Drawer';

type LayoutProps = Partial<Pick<AppBarProps, 'title'>> & {
  children?: React.ReactNode;
};

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Relative = styled('div')(() => ({
  position: 'relative',
  flex: 1,
}));

export function Layout({ title, children }: LayoutProps) {
  const classes = useStyles();
  const isLoggedIn = useIsLoggedIn();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = () => setDrawerOpen(true);
  const handleClose = () => setDrawerOpen(false);

  return (
    <div className={classes.root}>
      <AppBar title={title} onMenuOpen={handleMenuOpen} />
      <Drawer open={drawerOpen} onClose={handleClose}>
        <DrawerItem
          content="Search library"
          icon={<SearchIcon />}
          to="/libraries"
        />
        <DrawerItem
          content="My bookings"
          icon={<LibraryBooks />}
          to="/bookings"
        />
        <DrawerItem content="Profile" icon={<PersonIcon />} to="/profile" />
        {isLoggedIn ? (
          <DrawerItem
            content="Log out"
            icon={<ExitToApp />}
            to="/auth/logout"
          />
        ) : (
          <>
            <DrawerItem content="Log in" icon={<LockIcon />} to="/auth/login" />
            <DrawerItem
              content="Sign up"
              icon={<PersonAddIcon />}
              to="/auth/signup"
            />
          </>
        )}
      </Drawer>
      <Relative>{children}</Relative>
    </div>
  );
}
