import { Layout } from '@/components/Layout';
import {
  Box,
  Container,
  Paper as MuiPaper,
  Typography as MuiTypography,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

interface LibraryFormLayoutProps {
  readonly title: string;
  readonly children: React.ReactNode;
}

const Paper = styled(MuiPaper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
}));

const Typography = styled(MuiTypography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const LibraryFormLayout = ({
  title,
  children,
}: LibraryFormLayoutProps) => (
  <Layout>
    <Container maxWidth="md">
      <Paper elevation={3}>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          minHeight={300}
        >
          <Typography variant="h4">{title}</Typography>
          <Alert variant="outlined" severity="info">
            Fields marked with an asterisk (*) are required.
          </Alert>
          {children}
        </Box>
      </Paper>
    </Container>
  </Layout>
);
