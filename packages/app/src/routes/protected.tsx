import { DashboardRoutes } from '@/features/dashboard/routes';
import { FavoritesRoutes } from '@/features/favorites/routes';
import { LibrariesRoutes } from '@/features/libraries/routes';
import { SettingsRoutes } from '@/features/settings/routes';
import { Navigate } from 'react-router-dom';

export const protectedRoutes = (isLoggedIn: boolean) =>
  isLoggedIn
    ? [
        {
          path: '/libraries/*',
          element: <LibrariesRoutes />,
        },

        {
          path: '/favorites/*',
          element: <FavoritesRoutes />,
        },
        {
          path: '/dashboard/*',
          element: <DashboardRoutes />,
        },
        {
          path: '/settings/*',
          element: <SettingsRoutes />,
        },
      ]
    : [
        {
          path: '*',
          element: <Navigate to="/auth/login" />,
        },
      ];
