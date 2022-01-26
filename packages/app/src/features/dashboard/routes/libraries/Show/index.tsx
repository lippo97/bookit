import { Layout } from '@/components/Layout';
import { QueryContent } from '@/components/QueryContent';
import { getLibraryById } from '@/features/dashboard/api/getLibraries';
import { RoomList } from '@/features/dashboard/components/RoomList';
import { LibraryHeader } from '@/features/libraries/components/LibraryHeader';
import { WithId } from '@asw-project/shared/data/withId';
import { Room } from '@asw-project/shared/generatedTypes';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(2, 0),
    fontWeight: 'bold',
  },
}));

export const ShowLibrary = () => {
  const { id } = useParams();
  const classes = useStyles();
  const { data, status } = useQuery(['library', id], () => getLibraryById(id));
  return (
    <Layout transparentAppBar>
      <QueryContent data={data} status={status}>
        {(d) => (
          <>
            <LibraryHeader src={d.imageFileName} />
            <Container>
              <Typography variant="h6" className={classes.title}>
                {d.name}
              </Typography>
              <RoomList rooms={d.rooms as any} libraryId={id} />
            </Container>
          </>
        )}
      </QueryContent>
    </Layout>
  );
};
