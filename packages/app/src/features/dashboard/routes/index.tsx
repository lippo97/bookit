import { Route, Routes } from 'react-router-dom';
import { AddLibrary } from './libraries/Add';
import { EditLibrary } from './libraries/Edit';
import { Dashboard } from './Dashboard';

export const DashboardRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/libraries">
      <Route path="add" element={<AddLibrary />} />
      <Route path=":id/edit" element={<EditLibrary />} />
    </Route>
  </Routes>
);
