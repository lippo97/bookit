import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: '250px',
    width: '100%',
    position: 'relative',
  },
}));

interface PageHeaderProps {
  readonly children: React.ReactNode;
}

export const PageHeader = ({ children }: PageHeaderProps) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};
