import { DialogButton } from '@/components/DialogButton';
import {
  Button,
  Checkbox,
  Chip,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useSeats } from '../../stores/seats';
import { MyCheckbox } from './MyCheckbox';
import { aggregate } from './utils';

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
  const selectedIds = useSeats((s) => s.selectedIds);
  const selectedSeats = useSeats((s) =>
    selectedIds.map((id) => ({ id, seat: s.seatById[id] })),
  );
  const removeSeat = useSeats((s) => s.removeSeat);
  const setSelectionProperty = useSeats((s) => s.setSelectionProperty);
  const clearSelection = useSeats((s) => s.clearSelection);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const res = aggregate(selectedSeats.map(({ seat }) => seat.properties));
  console.log(res);
  return (
    <Paper square elevation={3} className={classes.sidebar}>
      <Typography variant="h6">Details</Typography>
      <Typography variant="subtitle1">Selected seats:</Typography>
      {selectedSeats.map(({ id }) => (
        <Chip label={id} style={{ marginRight: 5 }} />
      ))}
      {selectedIds.length > 0 && (
        <Grid container>
          {Object.entries(res).map(([k, v]) => (
            <>
              <Grid item xs={10}>
                {k}
              </Grid>
              <Grid item xs={2}>
                <MyCheckbox checked={v} onChange={(e) => setSelectionProperty(k as any, e.target.checked)} />
              </Grid>
            </>
          ))}
          <Grid item xs={12}>
            <DialogButton
              title="Delete selected seat(s)?"
              description={`Are you sure you want to delete the following seats?
${selectedIds.join(', ')}`}
              isOpen={isDialogOpen}
              setOpen={setDialogOpen}
              id="delete-selected"
              autoClose
              onConfirm={() => removeSeat(selectedIds)}
              as={Button}
              fullWidth
              variant="outlined"
              color="secondary"
            >
              Delete selected
            </DialogButton>
            <Button
              fullWidth
              onClick={clearSelection}
              variant="outlined"
              style={{ marginTop: '8px' }}
            >
              Clear selection
            </Button>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};
