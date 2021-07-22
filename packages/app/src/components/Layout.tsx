import AppBar, { AppBarProps } from './AppBar';
import Drawer from './Drawer';
import { useState } from 'react';

type LayoutProps = Pick<AppBarProps, 'title'> & {
  children?: JSX.Element | JSX.Element[];
};

function Layout({ title, children }: LayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = () => setDrawerOpen(true);
  const handleClose = () => setDrawerOpen(false);

  return (
    <div>
      <AppBar title={title} onMenuOpen={handleMenuOpen} />
      <Drawer open={drawerOpen} onClose={handleClose} />
      {children}
    </div>
  );
}

export default Layout;
