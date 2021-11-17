import { Layout } from '@/components/Layout';
import { useMobile } from '@/hooks/useMobile';
import { useOpenClose } from '@/hooks/useOpenClose';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { updateRoomSeats } from '../../api/rooms';
import { SeatMap, useSeats } from '../../stores/seats';
import { Content } from './Content';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';
import { ToolFAB } from './ToolFAB';

interface FloorMapProps {
  readonly roomId: string;
  readonly initialSeats?: SeatMap;
}

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '1fr auto',
    gridTemplateAreas: `
    "toolbar  sidebar"
    "content  sidebar"
    `,
    overflow: 'hidden',
  },
});

export const FloorMap = ({ roomId, initialSeats }: FloorMapProps) => {
  const classes = useStyles();
  const initialize = useSeats((s) => s.initialize);
  const [isFABOpen, handleOpen, handleClose] = useOpenClose();
  const [isSaving, setSaving, stopSaving] = useOpenClose();

  useEffect(() => {
    if (initialSeats !== undefined) {
      initialize(initialSeats);
    }
  }, [initialSeats]);

  const handleSave = async () => {
    const { seatById } = useSeats.getState();
    setSaving();
    await updateRoomSeats(roomId, seatById);
    stopSaving();
  };

  return (
    <Layout>
      <div className={classes.root}>
        <Toolbar onSave={handleSave} />
        <Sidebar />
        <Content />
      </div>
      <Backdrop open={isSaving} style={{ zIndex: 1 }}>
        <CircularProgress />
      </Backdrop>
      <Backdrop open={isFABOpen} style={{ zIndex: 1 }} />
      <ToolFAB
        open={isFABOpen}
        onOpen={handleOpen}
        onClose={handleClose}
        onSave={handleSave}
      />
    </Layout>
  );
};
