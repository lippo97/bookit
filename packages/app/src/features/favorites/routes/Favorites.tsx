import { Layout } from '@/components/Layout';
import LibraryList from '@/components/search/LibraryList';
import { useAuth } from '@/stores/authentication';
import { Container } from '@material-ui/core';
import { useQuery } from 'react-query';
import { getFavorites } from '../api/favorites';

export function Favorites() {
  const updateFavorites = useAuth((s) => s.updateFavoriteLibraries);
  const { data, isLoading } = useQuery('favorites', () =>
    getFavorites().then((libraries) => {
      // eslint-disable-next-line no-underscore-dangle
      updateFavorites(libraries.map((l) => l._id));
      return libraries;
    }),
  );

  return (
    <Layout>
      <Container>
        <LibraryList isLoading={isLoading} places={data || []} />
      </Container>
    </Layout>
  );
}
