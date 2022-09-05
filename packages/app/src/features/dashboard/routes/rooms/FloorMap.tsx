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
import {
  deleteRoomSeats,
  getRoomById,
  updateRoom,
  updateRoomSeats,
} from '../../api/rooms';
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
  const setRoomName = useEditor((s) => s.setRoomName);
  const size = useSeats((s) => s.size);
  const setSize = useSeats((s) => s.setSize);
  const { status } = useQuery(
    ['get room', roomId],
    () => Promise.all([getSeats(roomId), getRoomById(roomId)]),
    {
      onSuccess: ([seats, room]) => {
        const { setSelectedTool } = useEditor.getState();

        const d = keyBy(
          seats
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

        const { x, y } = room.size;
        initialize(d);
        setRoomName(room.name);
        setSize([x, y]);
        setSelectedTool('select');
      },
    },
  );
  const { pushNotification } = useNotification();

  const [isFABOpen, handleOpen, handleClose] = useOpenClose();
  const [isSaving, setSaving, stopSaving] = useOpenClose();

  const handleSave = async () => {
    const { seatById, toBeRemoved } = useSeats.getState();
    setSaving();
    try {
      await Promise.all([
        updateRoom(roomId)({
          size: { x: size[0], y: size[1] },
        }),
        updateRoomSeats(libraryId, roomId, seatById),
        deleteRoomSeats(toBeRemoved),
      ]);
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

  return (
    <Layout>
      <div className={classes.root}>
        {status === 'success' && <Content />}
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
