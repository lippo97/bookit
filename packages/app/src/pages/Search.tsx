import { Container } from '@material-ui/core';
import Layout from '../components/Layout';
import SearchComponent from '../components/search';

function Search() {
  return (
    <Layout title="Search">
      <Container>
        <SearchComponent />
      </Container>
    </Layout>
  );
}

export default Search;
