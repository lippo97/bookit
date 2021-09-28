import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { QueryContent } from '@/components/QueryContent';
import {
  Box,
  Button,
  Container,
  Fab,
  Hidden,
  Typography,
} from '@material-ui/core';
import { useQuery } from 'react-query';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { LibraryList } from '../components/LibraryList';
import { getLibraries } from '../api/getLibraries';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export const Dashboard = () => {
  const { data, status, refetch } = useQuery('dashboard', () => getLibraries());
  const classes = useStyles();

  return (
    <Layout>
      <Container>
        <Box mt={2} mb={2}>
          <Typography variant="h4">Dashboard</Typography>
          <QueryContent status={status} data={data} retry={() => refetch()}>
            {(d) => <LibraryList data={d} />}
          </QueryContent>
        </Box>
        <Hidden smDown>
          <Box display="flex" justifyContent="right" mt={2}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/dashboard/libraries/add"
            >
              Add library
            </Button>
          </Box>
        </Hidden>
      </Container>
      <Hidden mdUp>
        <Fab
          className={classes.fab}
          color="primary"
          aria-label="add"
          component={Link}
          to="/dashboard/libraries/add"
        >
          <AddIcon />
        </Fab>
      </Hidden>
    </Layout>
  );
};
