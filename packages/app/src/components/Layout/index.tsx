import { useState } from 'react';
import { styled } from '@material-ui/core/styles';

import { useIsLoggedIn } from '@/stores/authentication';
import { Box, Divider } from '@material-ui/core';
import { AppBar } from './AppBar';
import { Drawer } from './Drawer';
import { DrawerContent } from './DrawerContent';
import { DrawerUserInfo } from './DrawerUserInfo';

const extendedBarHeight = 160;

type LayoutProps = {
  noDrawer?: true;
  extendedAppBar?: true;
  children?: React.ReactNode;
};

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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = () => setDrawerOpen(true);
  const handleClose = () => setDrawerOpen(false);

  // This is easier to read than the '!noDrawer' condition.
  const hasDrawer = !noDrawer;

  return (
    <Box
      position="relative"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
    >
      {extendedAppBar && <ExtendedAppBar />}
      <AppBar
        extendedAppBar={extendedAppBar}
        noDrawer={noDrawer}
        onMenuOpen={handleMenuOpen}
      />
      {hasDrawer && (
        <Drawer open={drawerOpen} onClose={handleClose} onOpen={handleMenuOpen}>
          <DrawerUserInfo />
          <DrawerContent />
        </Drawer>
      )}
      <Box position="relative" flex="1" paddingBottom={2}>
        {children}
      </Box>
    </Box>
  );
}
