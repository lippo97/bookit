import { Library } from '@/features/libraries/routes/Library';
import { Route, Routes } from 'react-router-dom';
import { Favorites } from './Favorites';

export const FavoritesRoutes = () => (
  <Routes>
    <Route path="/" element={<Favorites />} />
    <Route path=":id" element={<Library />} />
  </Routes>
);
