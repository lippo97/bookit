import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { QueryContent } from '@/components/QueryContent';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { useQuery } from 'react-query';
import background from '@/assets/bg.png';
import { getLibraries } from '@/features/dashboard/api/libraries';
import { LibraryList } from '../../../components/LibraryList';

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(2, 0),
    fontWeight: 'bold',
  },
}));

export const AllLibraries = () => {
  const classes = useStyles();
  const { data, status, refetch } = useQuery(['library'], () => getLibraries());
  return (
    <Layout transparentAppBar>
      <PageHeader>
        <img
          src={background}
          style={{ height: '100%', width: '100%', objectFit: 'cover' }}
          alt="Background"
        />
      </PageHeader>
      <QueryContent data={data} status={status}>
        {(d) => (
          <Container>
            <Typography variant="h6" className={classes.title}>
              Libraries
            </Typography>
            <LibraryList data={d} refetch={refetch} />
          </Container>
        )}
      </QueryContent>
    </Layout>
  );
};
