import { Layout } from '@/components/Layout';
import { QueryContent } from '@/components/QueryContent';
import { getLibraryById } from '@/features/dashboard/api/getLibraries';
import { LibraryHeader } from '@/features/libraries/components/LibraryHeader';
import { useParams } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { useQuery } from 'react-query';
import { RoomList } from '@/features/dashboard/components/RoomList';

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(2, 0),
    fontWeight: 'bold',
  },
}));

export const ManageLibrary = () => {
  const { id } = useParams();
  const classes = useStyles();
  const { data, status } = useQuery(['library', id], () => getLibraryById(id));
  return (
    <Layout transparentAppBar>
      <QueryContent data={data} status={status}>
        {(d) => (
          <>
            <LibraryHeader src={d.imageFilename} />
            <Container>
              <Typography variant="h6" className={classes.title}>
                {d.name}
              </Typography>
              <RoomList rooms={d.rooms} />
            </Container>
          </>
        )}
      </QueryContent>
    </Layout>
  );
};
