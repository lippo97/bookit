import { Grid, Paper, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FillHeight from '@/components/FillHeight';

type ClassProps = Pick<LayoutProps, 'image'>;
const useStyles = makeStyles<Theme, ClassProps>((theme) => ({
  root: {
    height: '100%',
  },
  image: {
    backgroundImage: (props) => `url(${props.image})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

interface LayoutProps {
  readonly image: string;
  readonly children: JSX.Element;
}

export const Layout = ({ image, children }: LayoutProps) => {
  const classes = useStyles({ image });
  return (
    <FillHeight>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {children}
        </Grid>
      </Grid>
    </FillHeight>
  );
};
