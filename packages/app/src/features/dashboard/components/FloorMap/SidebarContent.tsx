import { DialogButton } from '@/components/DialogButton';
import {
  Box,
  Button,
  Chip,
  Grid,
  Hidden,
  IconButton,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import sortBy from 'lodash/sortBy';
import { useState } from 'react';
import { useSeats } from '../../stores/seats';
import { NormalizedPropertyMap, Property } from '../../types/Property';
import { iconForProperty } from '../../utils/iconForProperty';
import { MyCheckbox } from './MyCheckbox';
import { aggregate, AggregateRowResult } from './utils';

interface SidebarContentProps {}

const renderProperties = (
  aggregated: NormalizedPropertyMap<AggregateRowResult>,
  setSelectionProperty: (p: Property, value: boolean) => void,
) => (
  <Box>
    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
      Properties
    </Typography>
    {Object.entries(aggregated).map(([k, v]) => (
      <Grid item xs={12}>
        <Box display="flex">
          <Box flex={1} display="flex" alignItems="center">
            <Box minWidth={56} style={{ color: 'rgba(0,0,0,0.54)' }}>
              {iconForProperty(k as any)}
            </Box>
            <Typography variant="body2">{k}</Typography>
          </Box>
          <MyCheckbox
            checked={v}
            onChange={(e) => setSelectionProperty(k as any, e.target.checked)}
          />
        </Box>
      </Grid>
    ))}
  </Box>
);

export const SidebarContent = ({}: SidebarContentProps) => {
  const selectedIds = useSeats((s) => s.selectedIds);
  const selectedSeats = useSeats((s) =>
    selectedIds.map((id) => ({ id, seat: s.seatById[id] })),
  );
  const removeSeat = useSeats((s) => s.removeSeat);
  const setSelectionProperty = useSeats((s) => s.setSelectionProperty);
  const clearSelection = useSeats((s) => s.clearSelection);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const res = aggregate(selectedSeats.map(({ seat }) => seat.properties));

  return (
    <>
      <Typography variant="h6" style={{ fontWeight: 'bold' }}>
        Details
      </Typography>
      <Box>
        <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
          Selected seats
        </Typography>
        {sortBy(selectedSeats, 'id').map(({ id }) => (
          <Chip label={id} style={{ marginRight: 5 }} />
        ))}
      </Box>
      {selectedIds.length > 0 && renderProperties(res, setSelectionProperty)}
      <Box>
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
      </Box>
    </>
  );
};
