import { LibrariesRoutes } from '@/features/libraries/routes';
import { Navigate } from 'react-router-dom';

export const protectedRoutes = (isLoggedIn: boolean) =>
  isLoggedIn
    ? [
        {
          path: '/libraries/*',
          element: <LibrariesRoutes />,
        },
      ]
    : [
        {
          path: '*',
          element: <Navigate to="/auth/login" />,
        },
      ];
