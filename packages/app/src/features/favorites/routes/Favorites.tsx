import { Layout } from '@/components/Layout';
import LibraryList from '@/components/search/LibraryList';
import { useAuth } from '@/stores/authentication';
import { Container } from '@material-ui/core';
import { useQuery } from 'react-query';
import { getFavorites } from '../api/favorites';

export function Favorites() {
  // const updateFavorites = useAuth((s) => s.updateFavoriteLibraries);
  const { data, isLoading } = useQuery('favorites', () =>
    getFavorites().then((libraries) => libraries),
  );

  return (
    <Layout>
      <Container>
        <LibraryList isLoading={isLoading} places={data || []} />
      </Container>
    </Layout>
  );
}
