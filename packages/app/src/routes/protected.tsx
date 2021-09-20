import { DashboardRoutes } from '@/features/dashboard/routes';
import { LibrariesRoutes } from '@/features/libraries/routes';
import { Navigate } from 'react-router-dom';

export const protectedRoutes = (isLoggedIn: boolean) =>
  isLoggedIn
    ? [
        {
          path: '/libraries/*',
          element: <LibrariesRoutes />,
        },
        {
          path: '/dashboard/*',
          element: <DashboardRoutes />,
        },
      ]
    : [
        {
          path: '*',
          element: <Navigate to="/auth/login" />,
        },
      ];
