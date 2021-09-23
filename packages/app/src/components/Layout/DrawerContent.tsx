import { useIsLoggedIn } from '@/stores/authentication';
import { ListSubheader } from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ExitToApp from '@material-ui/icons/ExitToApp';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import LockIcon from '@material-ui/icons/Lock';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import { DrawerItem } from './DrawerItem';
import { DrawerSection } from './DrawerSection';

const Bookmarks = () => (
  <>
    <ListSubheader>Bookmarks</ListSubheader>
    <DrawerItem content="Bookmark 1" icon={<BookmarkIcon />} />
    <DrawerItem content="Bookmark 2" icon={<BookmarkIcon />} />
    <DrawerItem content="Bookmark 3" icon={<BookmarkIcon />} />
    <DrawerItem content="Bookmark 4" icon={<BookmarkIcon />} />
  </>
);
const SimpleRoutes = () => (
  <>
    <DrawerSection>
      <DrawerItem
        selected
        link
        content="Search library"
        icon={<SearchIcon />}
        to="/libraries"
      />
      <DrawerItem
        link
        content="My bookings"
        icon={<LibraryBooks />}
        to="/bookings"
      />
    </DrawerSection>
    <DrawerSection>
      <Bookmarks />
    </DrawerSection>
  </>
);

const ManagerRoutes = () => <></>;

export const DrawerContent = () => {
  const isLoggedIn = useIsLoggedIn();
  const type: 'simple' | 'manager' = 'simple' as 'simple' | 'manager';
  if (isLoggedIn) {
    return (
      <>
        {type === 'simple' && <SimpleRoutes />}
        {type === 'manager' && <ManagerRoutes />}
        <DrawerSection>
          <ListSubheader>Account</ListSubheader>
          <DrawerItem
            link
            content="Settings"
            icon={<SettingsIcon />}
            to="/settings"
          />
          <DrawerItem
            link
            content="Log out"
            icon={<ExitToApp />}
            to="/auth/logout"
          />
        </DrawerSection>
      </>
    );
  }
  return (
    <DrawerSection>
      <DrawerItem link content="Log in" icon={<LockIcon />} to="/auth/login" />
      <DrawerItem
        link
        content="Sign up"
        icon={<PersonAddIcon />}
        to="/auth/signup"
      />
    </DrawerSection>
  );
};
