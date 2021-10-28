import { DialogButton } from '@/components/DialogButton';
import { Chip, Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import keys from 'lodash/keys';
import groupBy from 'lodash/groupBy';
import { useState } from 'react';
import { useSeats } from '../../stores/seats';
import { entries, reduce } from 'lodash';

interface SidebarProps {}

type PropertyMap = {
  [k in string]?: boolean;
}

const merge = (acc: PropertyMap, curr: PropertyMap): PropertyMap => {
  const updates = {} as PropertyMap;
  entries(curr).forEach(([k, v]) => {
    updates[k] = v && (acc[k] ?? false);
  });
  return {
    ...acc,
    ...updates,
  };
}

function ensureField<T extends object>(t: T): (field: string, _default: any) => T {
  return (field, _default) => ({
    [field]: _default,
    ...t,
  });
}


const aggregate = (properties: PropertyMap[]): PropertyMap =>
  reduce(properties, (acc, v) => merge(acc, v), {});

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
  const clearSelection = useSeats((s) => s.clearSelection);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const res = aggregate(selectedSeats.map(({seat}) => seat.properties));
  console.log(res);
  console.log(ensureField(res)('k', 330))
  console.log(ensureField(ensureField(res)('k', 330))('Wi-Fi', true))
  return (
    <Paper square elevation={3} className={classes.sidebar}>
      <Typography variant="h6">Details</Typography>
      <Typography variant="subtitle1">Selected seats:</Typography>
      {selectedSeats.map(({ id }) => (
        <Chip label={id} style={{ marginRight: 5 }} />
      ))}
      {selectedIds.length > 0 && (
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
        </>
      )}
    </Paper>
  );
};
