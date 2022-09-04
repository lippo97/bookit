import { Layout } from '@/components/Layout';
import {
  Container,
  Paper as MuiPaper,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';
import { useState } from 'react';
import { accountTypes } from '@asw-project/shared/types/accountTypes';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/stores/authentication';
import { AddUserAccountForm } from '../components/account/AddUserAccountForm';
import { ManagerForm } from '../components/account/ManagerForm';

const Paper = styled(MuiPaper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  '& > *': {
    marginBottom: theme.spacing(2),
  },
}));

const MyTabPanel = styled(TabPanel)({
  marginBottom: 0,
  paddingBottom: 0,
});

type AccountType = typeof accountTypes.manager | typeof accountTypes.user;

export const AddAccount = () => {
  // eslint-disable-next-line no-underscore-dangle
  const id = useAuth((x) => x.auth?.account);
  // const id = undefined;

  const [value, setValue] = useState<AccountType>(accountTypes.user);
  if (id !== undefined) return <Navigate to="/" />;

  const handleTabChange = (_: any, newValue: AccountType) => setValue(newValue);

  return (
    <Layout extendedAppBar noDrawer>
      <Container maxWidth="md">
        <Paper elevation={3}>
          <Typography variant="h5">Getting started</Typography>
          <Typography variant="body1">
            Are you a user or a library manager?
          </Typography>
          <Tabs
            value={value}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="User" value="user" />
            <Tab label="Manager" value="manager" />
          </Tabs>
          <TabContext value={value}>
            <MyTabPanel value="user">
              <AddUserAccountForm />
            </MyTabPanel>
            <MyTabPanel value="manager">
              <ManagerForm />
            </MyTabPanel>
          </TabContext>
        </Paper>
      </Container>
    </Layout>
  );
};
