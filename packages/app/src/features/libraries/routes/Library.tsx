import { Layout } from '@/components/Layout';
import { QueryContent } from '@/components/QueryContent';
import { StepLayout } from '@/components/StepLayout';
import { useToggle } from '@/hooks/useToggle';
import { useAuth } from '@/stores/authentication';
import { Container } from '@material-ui/core';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
  getLibraryById,
  changeFavorite as changeFavoriteAPI,
} from '../api/libraries';
import { LibraryData } from '../components/LibraryData';
import { LibraryHeader } from '../components/LibraryHeader';

export const Library = () => {
  const { id } = useParams();
  const updateFavorite = useAuth((s) => s.updateFavoriteLibraries);
  const favlib = useAuth((s) => s.auth?.favoriteLibraries);

  const isFavoriteInitial = favlib ? favlib.includes(id) : false;

  const [isStarred, toggleStarred] = useToggle(isFavoriteInitial);

  const { data, status } = useQuery(['library', id], () => getLibraryById(id));

  const changeFavorite = () => {
    changeFavoriteAPI(isStarred, id).then(({ favoriteLibraries }) => {
      updateFavorite(favoriteLibraries);
      toggleStarred();
    });
  };

  return (
    <StepLayout transparent title={data !== undefined ? data.name : ''}>
      <QueryContent status={status} data={data}>
        {(d) => (
          <>
            <LibraryHeader
              src={d.imageFileName}
              isStarred={isStarred}
              onStar={changeFavorite}
            />
            <Container maxWidth="md">
              <LibraryData data={d} />
            </Container>
          </>
        )}
      </QueryContent>
    </StepLayout>
  );
};
