import { Layout } from '@/components/Layout';
import { QueryContent } from '@/components/QueryContent';
import { useToggle } from '@/hooks/useToggle';
import { useAuth } from '@/stores/authentication';
import { Container } from '@material-ui/core';
import { string } from 'joi';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
  getLibraryById,
  changeFavorite as changeFavoriteAPI,
} from '../api/getLibraries';
import { LibraryData } from '../components/LibraryData';
import { LibraryHeader } from '../components/LibraryHeader';

export const Library = () => {
  const { id } = useParams();
  const favlib = useAuth.getState().auth?.favoriteLibraries;

  // strange way to make filter working on string array[]
  const isFavoriteInitial = favlib
    ? (Object.entries(favlib)[0][1] as any).filter((e: string) => e === id)
        .length > 0
    : false;

  const [isStarred, toggleStarred] = useToggle(isFavoriteInitial);

  const changeFavorite = () => {
    changeFavoriteAPI(isStarred, id).then((fl) => {
      useAuth.getState().updateFavoriteLibraries(fl);
      toggleStarred();
    });
  };

  const { data, status } = useQuery(['library', id], () => getLibraryById(id));

  return (
    <Layout transparentAppBar>
      <QueryContent status={status} data={data}>
        {(d) => (
          <>
            <LibraryHeader
              src={d.imageFileName}
              isStarred={isStarred}
              onStar={changeFavorite}
            />
            <Container>
              <LibraryData data={d} />
            </Container>
          </>
        )}
      </QueryContent>
    </Layout>
  );
};
