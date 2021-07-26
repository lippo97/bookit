import { makeStyles } from '@material-ui/core';

interface FullVerticalProps {
  readonly children: JSX.Element;
}

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
}));

function FullVertical({ children }: FullVerticalProps) {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
}

export default FullVertical;
