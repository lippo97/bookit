import { CircularProgress, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
