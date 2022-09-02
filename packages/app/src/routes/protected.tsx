import { DashboardRoutes } from '@/features/dashboard/routes';
import { FavoritesRoutes } from '@/features/favorites/routes';
import { LibrariesRoutes } from '@/features/libraries/routes';
import { Landing } from '@/features/misc';
import { ReservationsRoutes } from '@/features/reservations/routes';
import { SettingsRoutes } from '@/features/settings/routes';
import { accountTypes } from '@asw-project/shared/types/accountTypes';
import { Navigate, Route, Routes } from 'react-router-dom';

type AccountType = keyof typeof accountTypes;

const commonLoggedInRoutes = [
  {
    path: '/settings/*',
    element: <SettingsRoutes />,
  },
];

/* <Navigate to="/dashboard" replace /> */
const switchAccountType = (accountType: AccountType) =>
  accountType === 'manager'
    ? [
        {
          path: '/',
          element: <Navigate replace to="/dashboard" />,
        },
        {
          path: '/dashboard/*',
          element: <DashboardRoutes />,
        },
      ]
    : [
        {
          path: '/libraries/*',
          element: <LibrariesRoutes />,
        },
        {
          path: '/reservations/*',
          element: <ReservationsRoutes />,
        },
        {
          path: '/favorites/*',
          element: <FavoritesRoutes />,
        },
      ];

export const protectedRoutes = (
  isLoggedIn: boolean,
  accountType: AccountType | undefined,
) => {
  if (!isLoggedIn) {
    return [
      {
        path: '*',
        element: <Navigate to="/auth/login" />,
      },
    ];
  }

  // This route allows logged in people to fill their account information,
  // but still not access all the other routes.
  if (accountType === undefined) {
    return [
      {
        path: '/settings/*',
        element: <SettingsRoutes />,
      },
    ];
  }

  return [...commonLoggedInRoutes, ...switchAccountType(accountType)];
};
