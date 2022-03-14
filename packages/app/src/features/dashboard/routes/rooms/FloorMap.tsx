import { Layout } from '@/components/Layout';
import { QueryContent } from '@/components/QueryContent';
import { IS_DEVELOPMENT } from '@/config';
import { useOpenClose } from '@/hooks/useOpenClose';
import { useNotification } from '@/stores/notifications';
import { Vector2 } from '@asw-project/shared/util/vector';
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import { mapValues } from 'lodash';
import { always } from 'lodash/fp';
import keyBy from 'lodash/keyBy';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { deleteRoomSeats, updateRoomSeats } from '../../api/rooms';
import { getSeats } from '../../api/seats';
import { Content } from '../../components/FloorMap/Content';
import { Sidebar } from '../../components/FloorMap/Sidebar';
import { Toolbar } from '../../components/FloorMap/Toolbar';
import { ToolFAB } from '../../components/FloorMap/ToolFAB';
import { useEditor } from '../../stores/editor';
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
  const { roomId, id: libraryId } = useParams();
  const classes = useStyles();
  const initialize = useSeats((s) => s.initialize);
  const { data, status } = useQuery(['get room', roomId], () =>
    getSeats(roomId),
  );
  const { pushNotification } = useNotification();

  const [isFABOpen, handleOpen, handleClose] = useOpenClose();
  const [isSaving, setSaving, stopSaving] = useOpenClose();

  const handleSave = async () => {
    const { seatById, toBeRemoved } = useSeats.getState();
    setSaving();
    try {
      await updateRoomSeats(libraryId, roomId, seatById);
      await deleteRoomSeats(toBeRemoved);
      pushNotification({
        message: 'Room saved successfully!',
        severity: 'success',
      });
    } catch (err) {
      if (IS_DEVELOPMENT) console.error(err);
      pushNotification({
        message: 'Something went wrong, retry later.',
        severity: 'error',
      });
    } finally {
      stopSaving();
    }
  };

  useEffect(() => {
    if (status === 'success' && data !== undefined) {
      const { setSelectedTool } = useEditor.getState();

      const d = keyBy(
        data
          .map((x) => ({
            ...x,
            previouslyExisting: true,
            moving: false,
            selected: false,
          }))
          .map(({ position: { x, y }, ...rest }) => ({
            ...rest,
            position: [x, y] as Vector2,
          }))
          .map(({ services, ...rest }) => ({
            ...rest,
            services: mapValues(keyBy(services), always(true)),
          }))
          .map(({ label, ...rest }) => ({
            ...rest,
            label: label.toString(),
          })),
        'label',
      );

      setSelectedTool('select');
      initialize(d);
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
