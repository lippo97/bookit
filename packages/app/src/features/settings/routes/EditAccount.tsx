import { Layout } from '@/components/Layout';
import { useAuth } from '@/stores/authentication';
import { accountTypes } from '@asw-project/shared/types/accountTypes';
import { Container, Paper as MuiPaper, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { EditManagerAccountForm } from '../components/account/EditManagerAccountForm';
import { EditUserAccountForm } from '../components/account/EditUserAccountForm';
import { AddAccount } from './AddAccount';

interface EditAccountProps {}

const Paper = styled(MuiPaper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  '& > *': {
    marginBottom: theme.spacing(2),
  },
}));

export const EditAccount = ({}: EditAccountProps) => {
  const account = useAuth((s) => s.auth?.account);
  // const type: 'simple' | 'manager' = 'simple';
  if (account) {
    return (
      <Layout extendedAppBar>
        <Container maxWidth="md">
          <Paper elevation={3}>
            <Typography variant="h5">Update account information</Typography>
            {account.type === accountTypes.user ? (
              <EditUserAccountForm />
            ) : (
              <EditManagerAccountForm />
            )}
          </Paper>
        </Container>
      </Layout>
    );
  }
  return null;
};
