import { Layout } from '@/components/Layout';
import { Container, Paper as MuiPaper, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import AccountInformation from '../components/AccountInformation';

const Paper = styled(MuiPaper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
}));

export const Settings = () => (
  <Layout extendedAppBar>
    <Container maxWidth="md">
      <Paper>
        <Typography variant="h4">Settings</Typography>
        <AccountInformation />
      </Paper>
    </Container>
  </Layout>
);
