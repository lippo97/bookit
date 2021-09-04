import { CircularProgress, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function LoadingPage() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <CircularProgress />
    </Grid>
  );
}

export default LoadingPage;
