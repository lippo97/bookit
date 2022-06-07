import { Route, Routes } from 'react-router-dom';

export const LibrariesRoutes = () => (
  <Routes>
    <Route path="/" element={<AllReservations />} />
    <Route path=":id" element={<ShowReservation />} />
  </Routes>
);
