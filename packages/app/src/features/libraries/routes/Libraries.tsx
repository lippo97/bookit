import { Layout } from '@/components/Layout';
import { useQueryParams } from '@/hooks';
import { Container } from '@material-ui/core';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getLibraries } from '../api/libraries';
import { LibraryHeader } from '../components/Header';
import { LibraryList } from '../components/LibraryList';

export function Libraries() {
  const searchQueryParam = useQueryParams('search', '');
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(['libraries', searchQueryParam], () =>
    getLibraries(searchQueryParam),
  );

  const handleSearch = (query: string) => {
    navigate({
      pathname: '.',
      search: `?${new URLSearchParams({ search: query }).toString()}`,
    });
  };

  return (
    <Layout>
      <Container>
        <LibraryHeader
          previousQuery={searchQueryParam}
          onSearch={handleSearch}
        />
        <LibraryList isLoading={isLoading} places={data || []} />
      </Container>
    </Layout>
  );
}
