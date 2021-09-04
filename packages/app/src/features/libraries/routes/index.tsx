import { Route, Routes } from 'react-router-dom';
import { Libraries } from './Libraries';
import { Library } from './Library';

export const LibrariesRoutes = () => (
  <Routes>
    <Route path="/" element={<Libraries />} />
    <Route path=":id" element={<Library />} />
  </Routes>
);
