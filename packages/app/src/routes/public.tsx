import { AuthRoutes } from '@/features/auth';
import { Logout } from '@/features/auth/routes/Logout';
import { Navigate } from 'react-router-dom';

export const publicRoutes = (isLoggedIn: boolean) => [
  {
    path: '/auth/logout',
    element: <Logout />,
  },
  {
    path: '/auth/*',
    element: isLoggedIn ? <Navigate to="/" /> : <AuthRoutes />,
  },
];
