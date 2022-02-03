import { Route, Routes } from 'react-router-dom';
import { AddLibrary } from './libraries/Add';
import { EditLibrary } from './libraries/Edit';
import { Dashboard } from './Dashboard';
import { ShowLibrary } from './libraries/Show';
import { FloorMap } from './rooms/FloorMap';
import { AllLibraries } from './libraries/All';
import AddRoom from './rooms/Add';
import EditRoom from './rooms/Edit';

export const DashboardRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/libraries">
      <Route path="/" element={<AllLibraries />} />
      <Route path="add" element={<AddLibrary />} />
      <Route path=":id" element={<ShowLibrary />} />
      <Route path=":id/edit" element={<EditLibrary />} />
      <Route path=":id/rooms/add" element={<AddRoom />} />
      <Route path=":id/rooms/:roomId/edit" element={<EditRoom />} />
      <Route path=":id/rooms/:roomId/floormap" element={<FloorMap />} />
    </Route>
  </Routes>
);
