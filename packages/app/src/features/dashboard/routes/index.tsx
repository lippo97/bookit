import { Route, Routes } from 'react-router-dom';
import { AddLibrary } from './libraries/Add';
import { EditLibrary } from './libraries/Edit';
import { Dashboard } from './Dashboard';
import { ShowLibrary } from './libraries/Show';
import { FloorMap } from '../components/FloorMap';
import { AllLibraries } from './libraries/All';

const initialSeats = {
  a: {
    position: [0, 0] as const,
    moving: false,
    selected: false,
    services: {
      Computer: true,
      'Wi-Fi': true,
      'Power supply': true,
    },
  },
  b: {
    position: [1, 0] as const,
    moving: false,
    selected: false,
    services: {
      'Wi-Fi': true,
    },
  },
  c: {
    position: [2, 1] as const,
    moving: false,
    selected: false,
    services: {
      'Wi-Fi': true,
    },
  },
  d: {
    position: [2, 2] as const,
    moving: false,
    selected: false,
    services: {
      'Wi-Fi': true,
    },
  },
  e: {
    position: [2, 3] as const,
    moving: false,
    selected: false,
    services: {
      'Wi-Fi': true,
    },
  },
};

export const DashboardRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route
      path="/floormap"
      element={<FloorMap roomId="mock" initialSeats={initialSeats} />}
    />
    <Route path="/libraries">
      <Route path="/" element={<AllLibraries />} />
      <Route path="add" element={<AddLibrary />} />
      <Route path=":id" element={<ShowLibrary />} />
      <Route path=":id/edit" element={<EditLibrary />} />
    </Route>
  </Routes>
);
