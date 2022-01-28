import { Layout } from '@/components/Layout';
import { QueryContent } from '@/components/QueryContent';
import { getLibraryById } from '@/features/dashboard/api/getLibraries';
import { RoomList } from '@/features/dashboard/components/RoomList';
import { LibraryHeader } from '@/features/libraries/components/LibraryHeader';
import { WithId } from '@asw-project/shared/data/withId';
import { Room } from '@asw-project/shared/generatedTypes';
import Link from '@/components/Link';
import {
  Box,
  Breadcrumbs,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  link: {
    display: 'flex',
  },
}));

export const ShowLibrary = () => {
  const { id } = useParams();
  const classes = useStyles();
  const { data, status, refetch } = useQuery(['library', id], () =>
    getLibraryById(id),
  );
  return (
    <Layout transparentAppBar>
      <QueryContent data={data} status={status}>
        {(d) => (
          <>
            <LibraryHeader src={d.imageFileName} />
            <Container>
              <Box mt={2} mb={2}>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link
                    color="inherit"
                    className={classes.link}
                    to="/dashboard"
                  >
                    <HomeIcon className={classes.icon} />
                    Dashboard
                  </Link>
                  <Typography color="textPrimary" className={classes.link}>
                    {d?.name}
                  </Typography>
                </Breadcrumbs>
              </Box>
              <RoomList
                rooms={d.rooms as any}
                libraryName={d.name}
                libraryId={id}
                refetch={refetch}
              />
            </Container>
          </>
        )}
      </QueryContent>
    </Layout>
  );
};
