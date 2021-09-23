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
import { AppBar } from './AppBar';
import { Drawer, DrawerItem } from './Drawer';

const extendedBarHeight = 160;

type LayoutProps = {
  noDrawer?: true;
  extendedAppBar?: true;
  children?: React.ReactNode;
};

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const ExtendedAppBar = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: extendedBarHeight,
  backgroundColor: theme.palette.primary.main,
}));

// https://www.reddit.com/r/google/comments/3rnk35/google_forms_updated_with_material_design_on_the/
// si potrebbe fare simile a questo da lg in poi
export function Layout({ children, extendedAppBar, noDrawer }: LayoutProps) {
  const classes = useStyles();
  const isLoggedIn = useIsLoggedIn();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = () => setDrawerOpen(true);
  const handleClose = () => setDrawerOpen(false);

  return (
    <div className={classes.root}>
      {extendedAppBar && <ExtendedAppBar />}
      <AppBar
        extendedAppBar={extendedAppBar}
        noDrawer={noDrawer}
        onMenuOpen={handleMenuOpen}
      />
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
      <Box position="relative" flex="1" paddingBottom={2}>
        {children}
      </Box>
    </div>
  );
}
