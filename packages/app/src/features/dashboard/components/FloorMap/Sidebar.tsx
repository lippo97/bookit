import { DialogButton } from '@/components/DialogButton';
import { Box, Button, Chip, Grid, Paper, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import sortBy from 'lodash/sortBy';
import { useState } from 'react';
import { useSeats } from '../../stores/seats';
import { NormalizedPropertyMap, Property } from '../../types/Property';
import { MyCheckbox } from './MyCheckbox';
import { aggregate, AggregateRowResult } from './utils';

interface SidebarProps {}

const sidebarWidth = 256;

type StyleProps = {
  open: boolean
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  sidebar: ({ open }) => ({
    // gridArea: 'sidebar',
    // gridArea: 'content',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    transition: 'translate 0.3s',
    translate: `${open ? 0 : sidebarWidth}px`,
    width: `${sidebarWidth}px`,
    height: '100%',
    padding: theme.spacing(1.5),
    zIndex: theme.zIndex.drawer,
  }),
}));

const renderProperties = (
  aggregated: NormalizedPropertyMap<AggregateRowResult>,
  setSelectionProperty: (p: Property, value: boolean) => void,
) =>
  Object.entries(aggregated).map(([k, v]) => (
    <Grid item xs={12}>
      <Box display="flex">
        <Box flex={1}>
          <Typography variant="body2">{k}</Typography>
        </Box>
        <MyCheckbox
          checked={v}
          onChange={(e) => setSelectionProperty(k as any, e.target.checked)}
        />
      </Box>
    </Grid>
  ));

export const Sidebar = () => {
  const selectedIds = useSeats((s) => s.selectedIds);
  const selectedSeats = useSeats((s) =>
    selectedIds.map((id) => ({ id, seat: s.seatById[id] })),
  );
  const removeSeat = useSeats((s) => s.removeSeat);
  const setSelectionProperty = useSeats((s) => s.setSelectionProperty);
  const clearSelection = useSeats((s) => s.clearSelection);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const classes = useStyles({ open: selectedIds.length > 0 });

  const res = aggregate(selectedSeats.map(({ seat }) => seat.properties));
  return (
    <Paper square elevation={3} className={classes.sidebar}>
      <Typography variant="h6">Details</Typography>
      <Typography variant="subtitle1">Selected seats:</Typography>
      {sortBy(selectedSeats, 'id').map(({ id }) => (
        <Chip label={id} style={{ marginRight: 5 }} />
      ))}
      {selectedIds.length > 0 && (
        <Grid container>
          {renderProperties(res, setSelectionProperty)}
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
