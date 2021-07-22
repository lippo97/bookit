import { Container, Typography } from '@material-ui/core';
import Layout from '../components/Layout';

function Home() {
  return (
    <Layout title="Home">
      <Container>
        <Typography variant="h2">Home component</Typography>
        <Typography variant="body1">
          This is the home component body. The text you write in the body will be displayed here.
        </Typography>
      </Container>
    </Layout>
  );
}

export default Home;
