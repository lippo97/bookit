import { Vector2 } from '@asw-project/shared/util/vector';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Seat, SparseMatrix } from './types';

interface SidebarProps {
  readonly seats: SparseMatrix<Seat>;
  readonly selected: readonly Vector2[];
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

export const Sidebar = ({ seats, selected }: SidebarProps) => {
  const classes = useStyles();

  return (
    <Paper square elevation={3} className={classes.sidebar}>
      <Typography variant="h6">Details</Typography>
      <Typography variant="subtitle1">Selected seats:</Typography>
      {selected.map(([x, y]) => {
        const seat = seats[x][y];
        if (seat) {
          return <div key={[x, y]}>{seat.id}</div>;
        }
        return <></>;
      })}
    </Paper>
  );
};
