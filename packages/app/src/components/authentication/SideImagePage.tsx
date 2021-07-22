import { Button, Grid, makeStyles, Paper, Theme } from '@material-ui/core';

type ClassProps = Pick<SideImagePageProps, 'image'>;
const useStyles = makeStyles<Theme, ClassProps>((theme) => ({
  root: {
    height: '100vh',
    overflow: 'hidden',
  },
  image: {
    backgroundImage: (props) => `url(${props.image})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

interface SideImagePageProps {
  readonly image: string;
  readonly children: JSX.Element;
}

export const SideImagePage = ({ image, children }: SideImagePageProps) => {
  const classes = useStyles({ image });
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image}></Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {children}
      </Grid>
    </Grid>
  );
};
