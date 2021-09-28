import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useState } from 'react';
import { AppBar } from './AppBar';
import { Drawer } from './Drawer';
import { DrawerUserInfo as DrawerAccountInfo } from './DrawerAccountInfo';
import { DrawerContent } from './DrawerContent';

const extendedBarHeight = 160;

type TransparentAppBarProps = {
  transparentAppBar?: true;
  extendedAppBar?: never;
};

type ExtendedAppBarProps = {
  extendedAppBar?: true;
  transparentAppBar?: never;
};

type LayoutProps = {
  noDrawer?: true;
  children?: React.ReactNode;
} & (ExtendedAppBarProps | TransparentAppBarProps);

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
export function Layout({
  children,
  extendedAppBar,
  transparentAppBar,
  noDrawer,
}: LayoutProps) {
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
        transparentAppBar={transparentAppBar}
        onMenuOpen={handleMenuOpen}
      />
      {hasDrawer && (
        <Drawer open={drawerOpen} onClose={handleClose} onOpen={handleMenuOpen}>
          <DrawerAccountInfo />
          <DrawerContent />
        </Drawer>
      )}
      <Box position="relative" flex="1" paddingBottom={2}>
        {children}
      </Box>
    </Box>
  );
}
