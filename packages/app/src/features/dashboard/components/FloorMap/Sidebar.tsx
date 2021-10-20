import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface SidebarProps {
}

const useStyles = makeStyles((theme) => ({
  sidebar: {
    gridArea: 'sidebar',
    width: '256px',
    height: '100%',
    padding: theme.spacing(1.5),
    zIndex: theme.zIndex.drawer,
  },
}));

export const Sidebar = () => {
  const classes = useStyles();

  return (
    <Paper square elevation={3} className={classes.sidebar}>
      <Typography variant="h6">Details</Typography>
      <Typography variant="subtitle1">Selected seats:</Typography>
      {
      //   selected.map(([x, y]) => {
      //   const seat = seats[x][y];
      //   if (seat) {
      //     return <div key={[x, y].toString()}>{seat.id}</div>;
      //   }
      //   return <></>;
      // })
      }
    </Paper>
  );
};
