import { DialogButton } from '@/components/DialogButton';
import { useMobile } from '@/hooks/useMobile';
import {
  Box,
  Button,
  Chip,
  Grid,
  Hidden,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import sortBy from 'lodash/sortBy';
import { MutableRefObject, useRef, useState } from 'react';
import { useSeats } from '../../stores/seats';
import { NormalizedPropertyMap, Property } from '../../types/Property';
import { iconForProperty } from '../../utils/iconForProperty';
import { MyCheckbox } from './MyCheckbox';
import { aggregate, AggregateRowResult } from './utils';

interface SidebarProps {}

const sidebarWidth = 256;

type StyleProps = {
  open: boolean;
  isMobile: boolean;
  sidebarRef: MutableRefObject<HTMLDivElement | null>;
};

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  sidebar: ({ open, isMobile, sidebarRef }) => ({
    ...{
      position: 'absolute',
      bottom: 0,
      right: 0,
      transition: 'translate 0.3s',
      padding: theme.spacing(1.5),
      zIndex: theme.zIndex.drawer,
      '& > *': {
        marginBottom: theme.spacing(2),
      },
    },
    ...(isMobile
      ? {
          left: 0,
          width: '100%',
          translate: `0 ${
            !open && sidebarRef.current
              ? sidebarRef.current.getBoundingClientRect().height
              : 0
          }px`,
          borderRadius: theme.spacing(1),
          paddingTop: theme.spacing(2.5),
        }
      : {
          top: 0,
          height: '100%',
          width: `${sidebarWidth}px`,
          translate: `${open ? 0 : sidebarWidth}px`,
        }),
  }),
}));

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

export const Sidebar = () => {
  const selectedIds = useSeats((s) => s.selectedIds);
  const selectedSeats = useSeats((s) =>
    selectedIds.map((id) => ({ id, seat: s.seatById[id] })),
  );
  const removeSeat = useSeats((s) => s.removeSeat);
  const setSelectionProperty = useSeats((s) => s.setSelectionProperty);
  const clearSelection = useSeats((s) => s.clearSelection);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const isMobile = useMobile();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const classes = useStyles({
    open: selectedIds.length > 0,
    isMobile,
    sidebarRef,
  });

  const res = aggregate(selectedSeats.map(({ seat }) => seat.properties));
  return (
    <Paper square elevation={3} className={classes.sidebar} ref={sidebarRef}>
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
    </Paper>
  );
};
