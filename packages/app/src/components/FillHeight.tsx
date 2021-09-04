import { makeStyles } from '@material-ui/core/styles';

interface FillHeightProps {
  readonly children: JSX.Element;
}

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
  },
}));

function FillHeight({ children }: FillHeightProps) {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
}

export default FillHeight;
