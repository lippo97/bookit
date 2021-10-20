import { Chip, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSeats } from '../../stores/seats';

interface SidebarProps {}

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
  const selected = useSeats((s) => s.selectedIds);

  return (
    <Paper square elevation={3} className={classes.sidebar}>
      <Typography variant="h6">Details</Typography>
      <Typography variant="subtitle1">Selected seats:</Typography>
      {selected.map((id) => (
        <Chip label={id} style={{ marginRight: 5 }} />
      ))}
    </Paper>
  );
};
