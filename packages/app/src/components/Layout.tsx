import { useState } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import ExitToApp from '@material-ui/icons/ExitToApp';

import AppBar, { AppBarProps } from './AppBar';
import { Drawer, DrawerItem } from './Drawer';

type LayoutProps = Partial<Pick<AppBarProps, 'title'>> & {
  children?: JSX.Element | JSX.Element[];
};

function Layout({ title, children }: LayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = () => setDrawerOpen(true);
  const handleClose = () => setDrawerOpen(false);

  return (
    <div>
      <AppBar title={title} onMenuOpen={handleMenuOpen} />
      <Drawer open={drawerOpen} onClose={handleClose}>
        <DrawerItem
          content="Search library"
          icon={<SearchIcon />}
          to="/places"
        />
        <DrawerItem
          content="My bookings"
          icon={<LibraryBooks />}
          to="/bookings"
        />
        <DrawerItem content="Profile" icon={<PersonIcon />} to="/profile" />
        <DrawerItem content="Log out" icon={<ExitToApp />} to="/logout" />
      </Drawer>

      {children}
    </div>
  );
}

export default Layout;
