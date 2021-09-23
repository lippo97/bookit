import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useIsLoggedIn } from '@/stores/authentication';
import LoadingPage from '@/components/Loading';
import { useNotification } from '@/stores/notifications';

export function Logout() {
  const navigate = useNavigate();
  const logout = useAuth((s) => s.logout);
  const pushNotification = useNotification((s) => s.pushNotification);
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    const logoutOrNothing = isLoggedIn
      ? logout().then(() =>
          pushNotification({
            message: 'Logged out successfully.',
            severity: 'info',
          }),
        )
      : Promise.resolve();
    logoutOrNothing.then(() => navigate('/'));
  }, [isLoggedIn]);

  return <LoadingPage />;
}
