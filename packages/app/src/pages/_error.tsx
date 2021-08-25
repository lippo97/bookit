import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

interface ErrorPageProps {
  readonly code: number;
  readonly text: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#f1f1f1',
    padding: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(10),
    },
  },
  container: {
    padding: theme.spacing(0),
  },
  paper: {
    height: '100%',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  title: {
    letterSpacing: 10,
  },
  subtitle: {
    marginBottom: theme.spacing(2),
  },
}));

function ErrorPage({ code, text }: ErrorPageProps) {
  const classes = useStyles();
  // return <div>Whoops, we can't find the page you're looking for.</div>;

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Paper elevation={6} className={classes.paper}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            className={classes.box}
          >
            <Typography variant="h1" className={classes.title}>
              404
            </Typography>
            <Divider />
            <Typography
              variant="h6"
              align="center"
              className={classes.subtitle}
            >
              We could't find the page you're looking for.
            </Typography>
            <Button variant="outlined" component={RouterLink} to="/">
              Go back
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default ErrorPage;
