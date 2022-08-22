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
  const favlib = useAuth((s) => s.auth?.favoriteLibrariesInfo);

  const isFavoriteInitial = favlib
    ? favlib.map((x) => x.libraryId).includes(id)
    : false;

  const [isStarred, toggleStarred] = useToggle(isFavoriteInitial);

  const { data, status } = useQuery(['library', id], () =>
    getLibraryById(id).then((l) => l),
  );

  const changeFavorite = (name: string) => {
    changeFavoriteAPI(isStarred, id, name).then((libs) => {
      updateFavorite(libs);
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
              onStar={() => changeFavorite(d.name)}
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
