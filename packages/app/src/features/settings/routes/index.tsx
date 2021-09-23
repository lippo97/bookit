import { Route, Routes } from 'react-router-dom';
import { Account } from './Account';
import { AddAccount } from './AddAccount';
import { EditAccount } from './EditAccount';
import { Settings } from './Settings';

export const SettingsRoutes = () => (
  <Routes>
    {/* These are just temporary */}
    <Route path="/" element={<Settings />} />
    <Route path="/account/add" element={<AddAccount />} />
    <Route path="/account/edit" element={<EditAccount />} />
    {/* These are just temporary */}
    <Route path="/account/edit" element={<Account />} />
  </Routes>
);
