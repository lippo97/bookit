import { Layout } from '@/components/Layout';
import { Container, Paper as MuiPaper, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { EditManagerAccountForm } from '../components/account/EditManagerAccountForm';
import { EditUserAccountForm } from '../components/account/EditUserAccountForm';

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
  const type: 'simple' | 'manager' = 'simple';

  return (
    <Layout>
      <Container maxWidth="md">
        <Paper elevation={3}>
          <Typography variant="h4">Update account information</Typography>
          {type === 'simple' ? (
            <EditUserAccountForm />
          ) : (
            <EditManagerAccountForm />
          )}
        </Paper>
      </Container>
    </Layout>
  );
};
