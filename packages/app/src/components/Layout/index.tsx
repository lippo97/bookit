import { useState } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import ExitToApp from '@material-ui/icons/ExitToApp';
import LockIcon from '@material-ui/icons/Lock';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { makeStyles, styled } from '@material-ui/core/styles';

import { useIsLoggedIn } from '@/stores/authentication';
import { Box } from '@material-ui/core';
import { AppBar, AppBarProps } from './AppBar';
import { Drawer, DrawerItem } from './Drawer';

type LayoutProps = {
  noDrawer?: true;
  children?: React.ReactNode;
};

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
}));

// https://www.reddit.com/r/google/comments/3rnk35/google_forms_updated_with_material_design_on_the/
// si potrebbe fare simile a questo da lg in poi
export function Layout({ children, noDrawer }: LayoutProps) {
  const classes = useStyles();
  const isLoggedIn = useIsLoggedIn();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = () => setDrawerOpen(true);
  const handleClose = () => setDrawerOpen(false);

  return (
    <div className={classes.root}>
      <AppBar noDrawer={noDrawer} onMenuOpen={handleMenuOpen} />
      {!noDrawer && (
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
          {isLoggedIn ? (
            <>
              <DrawerItem
                content="Profile"
                icon={<PersonIcon />}
                to="/settings"
              />
              <DrawerItem
                content="Log out"
                icon={<ExitToApp />}
                to="/auth/logout"
              />
            </>
          ) : (
            <>
              <DrawerItem
                content="Log in"
                icon={<LockIcon />}
                to="/auth/login"
              />
              <DrawerItem
                content="Sign up"
                icon={<PersonAddIcon />}
                to="/auth/signup"
              />
            </>
          )}
        </Drawer>
      )}
      <Box position="relative" flex="1">
        {children}
      </Box>
    </div>
  );
}
