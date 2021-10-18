import { Route, Routes } from 'react-router-dom';
import { Account } from './Account';
import { AddAccount } from './AddAccount';
import { EditAccount } from './EditAccount';
import { Settings } from './Settings';

export const SettingsRoutes = () => (
  <Routes>
    {/* These are just temporary */}
    <Route path="/" element={<Settings />} />
    <Route path="/account">
      <Route path="add" element={<AddAccount />} />
      <Route path="edit" element={<EditAccount />} />
      <Route path="manage" element={<Account />} />
    </Route>
  </Routes>
);
