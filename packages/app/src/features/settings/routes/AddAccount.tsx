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

type UserKind = 'simple' | 'manager';

export const AddAccount = () => {
  // eslint-disable-next-line no-underscore-dangle
  //   const id = useAuth((x) => x.auth?._id);
  const id = undefined;

  const [value, setValue] = useState<UserKind>('simple');
  //   if (id !== undefined) return <Navigate to="/" />;

  const handleTabChange = (_: any, newValue: UserKind) => setValue(newValue);

  return (
    <Layout extendedAppBar noDrawer>
      <Container maxWidth="md">
        <Paper elevation={3}>
          <Typography variant="h5">Getting started</Typography>
          <Typography variant="body1">
            Are you a library manager or a simple account?
          </Typography>
          <Tabs
            value={value}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Simple" value="simple" />
            <Tab label="Manager" value="manager" />
          </Tabs>
          <TabContext value={value}>
            <MyTabPanel value="simple">
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
