import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

interface ErrorPageProps {
  readonly code: number;
  readonly message: string;
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

export function Error({ code, message }: ErrorPageProps) {
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
              {code}
            </Typography>
            <Divider />
            <Typography
              variant="h6"
              align="center"
              className={classes.subtitle}
            >
              {message}
            </Typography>
            <Button variant="outlined" component={RouterLink} to="/">
              Go home
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
