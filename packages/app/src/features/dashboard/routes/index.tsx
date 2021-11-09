import { Route, Routes } from 'react-router-dom';
import { AddLibrary } from './libraries/Add';
import { EditLibrary } from './libraries/Edit';
import { Dashboard } from './Dashboard';
import { ManageLibrary } from './libraries/Manage';
import { FloorMap } from '../components/FloorMap';

const initialSeats = {
  a: {
    position: [0, 0] as const,
    moving: false,
    selected: false,
    properties: {
      Computer: true,
      'Wi-Fi': true,
      'Power supply': true,
    },
  },
  b: {
    position: [1, 0] as const,
    moving: false,
    selected: false,
    properties: {
      'Wi-Fi': true,
    },
  },
  c: {
    position: [2, 1] as const,
    moving: false,
    selected: false,
    properties: {
      'Wi-Fi': true,
    },
  },
  d: {
    position: [2, 2] as const,
    moving: false,
    selected: false,
    properties: {
      'Wi-Fi': true,
    },
  },
  e: {
    position: [2, 3] as const,
    moving: false,
    selected: false,
    properties: {
      'Wi-Fi': true,
    },
  },
};

export const DashboardRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route
      path="/floormap"
      element={<FloorMap initialSeats={initialSeats} />}
    />
    <Route path="/libraries">
      <Route path="add" element={<AddLibrary />} />
      <Route path=":id/edit" element={<EditLibrary />} />
      <Route path=":id/manage" element={<ManageLibrary />} />
    </Route>
  </Routes>
);
