import { Layout } from '@/components/Layout';
import { QueryContent } from '@/components/QueryContent';
import { useOpenClose } from '@/hooks/useOpenClose';
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getRoomById, updateRoomSeats } from '../../api/rooms';
import { Content } from '../../components/FloorMap/Content';
import { Sidebar } from '../../components/FloorMap/Sidebar';
import { Toolbar } from '../../components/FloorMap/Toolbar';
import { ToolFAB } from '../../components/FloorMap/ToolFAB';
import { useSeats } from '../../stores/seats';

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

export function FloorMap() {
  const { roomId } = useParams();
  const classes = useStyles();
  // const initialize = useSeats((s) => s.initialize);
  const { data, status } = useQuery(['get room', roomId], () =>
    getRoomById(roomId),
  );

  const [isFABOpen, handleOpen, handleClose] = useOpenClose();
  const [isSaving, setSaving, stopSaving] = useOpenClose();

  const handleSave = async () => {
    const { seatById } = useSeats.getState();
    setSaving();
    await updateRoomSeats(roomId, seatById);
    stopSaving();
  };

  useEffect(() => {
    if (status === 'success') {
      // console.log(data?.seats);
      // initialize(data?.seats);
    }
  }, [data, status]);

  return (
    <Layout>
      <div className={classes.root}>
        <QueryContent data={data} status={status}>
          {() => <Content />}
        </QueryContent>
        <Toolbar onSave={handleSave} />
        <Sidebar />
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
}