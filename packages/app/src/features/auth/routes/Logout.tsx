import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useIsLoggedIn } from '@/stores/authentication';
import LoadingPage from '@/components/Loading';

export function Logout() {
  const navigate = useNavigate();
  const logout = useAuth((s) => s.logout);
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    const logoutOrNothing = isLoggedIn ? logout() : Promise.resolve();
    logoutOrNothing.then(() => navigate('/'));
  }, [isLoggedIn]);

  return <LoadingPage />;
}
