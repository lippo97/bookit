import { Route, Routes } from 'react-router-dom';
import { Login } from './Login';
import { Signup } from './Signup';

export const AuthRoutes = () => (
  <Routes>
    <Route path="login" element={<Login />} />
    <Route path="signup" element={<Signup />} />
    <Route element={<Login />} />
  </Routes>
);
