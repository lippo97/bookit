import { Layout } from '@/components/Layout';
import { QueryContent } from '@/components/QueryContent';
import { getLibraryById } from '@/features/dashboard/api/libraries';
import { getRooms } from '@/features/dashboard/api/rooms';
import { RoomList } from '@/features/dashboard/components/RoomList';
import { LibraryHeader } from '@/features/libraries/components/LibraryHeader';
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
  const { data, status } = useQuery(['library', id], async () => {
    const library = await getLibraryById(id);
    const rooms = await getRooms(id);
    console.log(rooms);
    return { library, rooms };
  });
  return (
    <Layout transparentAppBar>
      <QueryContent data={data} status={status}>
        {(d) => (
          <>
            <LibraryHeader src={d.library.imageFileName} />
            <Container>
              <Typography variant="h6" className={classes.title}>
                {d.library.name}
              </Typography>
              <RoomList libraryId={id} rooms={d.rooms as any} />
            </Container>
          </>
        )}
      </QueryContent>
    </Layout>
  );
};
