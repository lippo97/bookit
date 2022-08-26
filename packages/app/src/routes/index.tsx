import { Error } from '@/features/misc';
import { useAuth, useIsLoggedIn } from '@/stores/authentication';
import { useRoutes } from 'react-router-dom';
import { commonRoutes } from './common';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const isLoggedIn = useIsLoggedIn();
  const accountType = useAuth((s) => s.auth?.account?.type);
  const routes = useRoutes([
    ...protectedRoutes(isLoggedIn, accountType),
    ...commonRoutes,
    ...publicRoutes(isLoggedIn),
    {
      path: '*',
      element: (
        <Error
          code={404}
          message="We couldn't find the page you are looking for."
        />
      ),
    },
  ]);

  return <>{routes}</>;
};
