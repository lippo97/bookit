import { Layout } from '@/components/Layout';
import { QueryContent } from '@/components/QueryContent';
import { getLibraryById } from '@/features/dashboard/api/getLibraries';
import { LibraryHeader } from '@/features/libraries/components/LibraryHeader';
import {
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
  },
  list: {
    backgroundColor: theme.palette.background.paper,
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
              <Typography variant="h5" className={classes.title}>
                {d.name}
              </Typography>
              <List className={classes.list}>
                <ListItem>
                  <ListItemText>Stanza 1</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText>Stanza 2</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Stanza 3</ListItemText>
                </ListItem>
              </List>
            </Container>
          </>
        )}
      </QueryContent>
    </Layout>
  );
};
