import { Layout } from '@/components/Layout';
import { Link as RouterLink } from 'react-router-dom';
import { QueryContent } from '@/components/QueryContent';
import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  Container,
  Fab,
  Hidden,
  Typography,
} from '@material-ui/core';
import { useQuery } from 'react-query';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import background from '@/assets/bg.png';
import { LibraryHeader } from '@/features/libraries/components/LibraryHeader';
import { LibraryList } from '../components/LibraryList';
import { getLibraries } from '../api/getLibraries';

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

export const Dashboard = () => {
  const { data, status, refetch } = useQuery('dashboard', () => getLibraries());
  const classes = useStyles();

  return (
    <Layout transparentAppBar>
      <LibraryHeader src={background} />
      <Container>
        <Box mt={2} mb={2}>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="textPrimary" className={classes.link}>
              <HomeIcon className={classes.icon} />
              Dashboard
            </Typography>
          </Breadcrumbs>
        </Box>
        <QueryContent status={status} data={data} retry={() => refetch()}>
          {(d) => <LibraryList data={d} refetch={refetch} />}
        </QueryContent>
      </Container>
    </Layout>
  );
};
