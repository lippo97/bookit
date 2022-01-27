import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { QueryContent } from '@/components/QueryContent';
import { LibraryHeader } from '@/features/libraries/components/LibraryHeader';
import {
  Breadcrumbs,
  Container,
  makeStyles,
  Link,
  Typography,
} from '@material-ui/core';
import { useQuery } from 'react-query';
import HomeIcon from '@material-ui/icons/Home';
import { useParams } from 'react-router-dom';
import background from '@/assets/bg.png';
import { getLibraries } from '../../../api/getLibraries';
import { LibraryList } from '../../../components/LibraryList';

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(2, 0),
    fontWeight: 'bold',
  },
}));

export const AllLibraries = () => {
  const { id } = useParams();
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
              Librariesaaa
            </Typography>
            <LibraryList data={d} refetch={refetch} />
          </Container>
        )}
      </QueryContent>
    </Layout>
  );
};
