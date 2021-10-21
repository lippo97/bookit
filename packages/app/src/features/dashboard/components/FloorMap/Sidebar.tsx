import { DialogButton } from '@/components/DialogButton';
import { Chip, Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
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
  const removeSeat = useSeats((s) => s.removeSeat);
  const clearSelection = useSeats((s) => s.clearSelection);
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <Paper square elevation={3} className={classes.sidebar}>
      <Typography variant="h6">Details</Typography>
      <Typography variant="subtitle1">Selected seats:</Typography>
      {selected.map((id) => (
        <Chip label={id} style={{ marginRight: 5 }} />
      ))}
      {selected.length > 0 && (
        <>
          <ul style={{ marginTop: '16px', padding: '0 16px' }}>
            <li>Some fake</li>
            <li>information</li>
            <li>just to fill some space</li>
            <li>oooo</li>
          </ul>
          <DialogButton
            title="Delete selected seat(s)?"
            description={`Are you sure you want to delete the following seats?
${selected.join(', ')}`}
            isOpen={isDialogOpen}
            setOpen={setDialogOpen}
            id="delete-selected"
            autoClose
            onConfirm={() => removeSeat(selected)}
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
        </>
      )}
    </Paper>
  );
};
