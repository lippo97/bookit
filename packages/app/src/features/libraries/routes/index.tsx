import { Route, Routes } from 'react-router-dom';
import { AddReservation } from './AddReservation';
import { ConfirmReservation } from './ConfirmReservation';
import { Libraries } from './Libraries';
import { Library } from './Library';
import { PickDate } from './PickDate';

export const LibrariesRoutes = () => (
  <Routes>
    <Route path="/" element={<Libraries />} />
    <Route path=":id" element={<Library />} />
    <Route path=":id/reservation/date" element={<PickDate />} />
    <Route path=":id/reservation" element={<AddReservation />} />
    <Route path=":id/reservation/confirm" element={<ConfirmReservation />} />
  </Routes>
);
