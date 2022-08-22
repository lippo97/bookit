import { StepLayout } from '@/components/StepLayout';
import { getReservationsOnRoom } from '@/features/libraries/api/reservations';
import { mergeQueryStatus } from '@/lib/queries';
import {
  Box,
  Button,
  Container as MuiContainer,
  Paper,
  styled,
} from '@material-ui/core';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getLibraryById } from '../api/libraries';
import {
  getReservationById,
  getRoomById,
  getSeatById,
} from '../api/reservations';
import { DeleteButton } from '../components/DeleteButton';
import { QR } from '../components/QR';
import { ReservationInfo } from '../components/ReservationInfo';
import { ViewDialog } from '../components/ViewDialog';

export const Container = styled(MuiContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const ShowReservation: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { data: reservationData, status: reservationStatus } = useQuery(
    ['reservation', id],
    () => getReservationById(id),
  );

  const { data: roomData, status: roomStatus } = useQuery(
    ['room', id],
    () => getRoomById(reservationData!.roomId),
    {
      enabled: reservationData !== undefined,
    },
  );

  const { data: seatData, status: seatStatus } = useQuery(
    ['seat', id],
    () => getSeatById(reservationData!.seatId),
    {
      enabled: reservationData !== undefined,
    },
  );

  const { data: libraryData, status: libraryStatus } = useQuery(
    ['library', id],
    () => getLibraryById(reservationData!.libraryId),
    {
      enabled: reservationData !== undefined,
    },
  );

  const status = mergeQueryStatus([
    reservationStatus,
    roomStatus,
    seatStatus,
    libraryStatus,
  ]);

  const onBack = () => {
    navigate('/reservations');
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const buttonDisabled =
    reservationData === undefined || today > new Date(reservationData.date);

  return (
    <StepLayout title="View reservation" onBack={onBack}>
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Container maxWidth="xs">
          <Paper elevation={2} style={{ padding: '24px', paddingTop: '40px' }}>
            <QR reservation={reservationData} status={status} />
            <ReservationInfo
              data={reservationData}
              roomData={roomData}
              seatData={seatData}
              libraryData={libraryData}
              status={status}
            />
          </Paper>
        </Container>
        <Container maxWidth="xs">
          <Button
            fullWidth
            variant="outlined"
            style={{ marginBottom: 8 }}
            onClick={() => setOpen(true)}
            disabled={reservationData === undefined}
          >
            View
          </Button>
          <DeleteButton status={status} id={id} disabled={buttonDisabled} />
        </Container>
      </Box>
      {status === 'success' && (
        <ViewDialog
          open={open}
          onClose={() => setOpen(false)}
          data={reservationData}
          // date={reservationData?.date}
          // roomId={reservationData?.roomId}
          // timeSlot={reservationData?.timeSlot}
          // // seatGrid={[] as any}
          // selected={seatData!._id}
        />
      )}
    </StepLayout>
  );
};
