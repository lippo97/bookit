import { Route, Routes } from 'react-router-dom';
import { AddLibrary } from './libraries/Add';
import { EditLibrary } from './libraries/Edit';
import { Dashboard } from './Dashboard';
import { ManageLibrary } from './libraries/Manage';

export const DashboardRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/libraries">
      <Route path="add" element={<AddLibrary />} />
      <Route path=":id/edit" element={<EditLibrary />} />
      <Route path=":id/manage" element={<ManageLibrary />} />
    </Route>
  </Routes>
);
