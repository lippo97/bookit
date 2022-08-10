import { useAuth, useIsLoggedIn } from '@/stores/authentication';
import { ListSubheader } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import LockIcon from '@material-ui/icons/Lock';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Star from '@material-ui/icons/Favorite';
import { DrawerItem } from './DrawerItem';
import { DrawerSection } from './DrawerSection';

const Bookmarks = () => {
  const favoriteLibraries = useAuth((s) => s.auth!.favoriteLibraries || []);
  return (
    <>
      <ListSubheader>Bookmarks</ListSubheader>
      {favoriteLibraries.map((b) => (
        <DrawerItem
          key={b}
          link
          content={b}
          icon={<Star />}
          to={`/libraries/${b}`}
        />
      ))}
    </>
  );
};
const UserRoutes = () => (
  <>
    <DrawerSection>
      <DrawerItem
        link
        content="Search library"
        icon={<SearchIcon />}
        to="/libraries"
      />
      <DrawerItem
        link
        content="My reservations"
        icon={<LibraryBooks />}
        to="/reservations"
      />
      <DrawerItem link content="My favorites" icon={<Star />} to="/favorites" />
    </DrawerSection>
    <DrawerSection>
      <Bookmarks />
    </DrawerSection>
  </>
);

const ManagerRoutes = () => (
  <>
    <DrawerSection>
      <DrawerItem
        link
        content="Dashboard"
        icon={<DashboardIcon />}
        to="/dashboard"
      />
    </DrawerSection>
  </>
);

export const DrawerContent = () => {
  const isLoggedIn = useIsLoggedIn();
  const type = useAuth((s) => s.auth?.account?.type);
  if (isLoggedIn) {
    return (
      <>
        {type === 'user' && <UserRoutes />}
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
