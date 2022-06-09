import { Route, Routes } from 'react-router-dom';
import { AllReservations } from './AllReservations';
import { ShowReservation } from './ShowReservation';

export const ReservationsRoutes = () => (
  <Routes>
    <Route path="/" element={<AllReservations />} />
    <Route path=":id" element={<ShowReservation />} />
  </Routes>
);
