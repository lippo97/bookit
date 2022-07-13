import { Layout } from '@/components/Layout';
import { QueryContent } from '@/components/QueryContent';
import {
  Box,
  Button,
  Container as MuiContainer,
  styled,
  Typography,
} from '@material-ui/core';
import { useMutation, useQuery } from 'react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import QRCode from 'react-qr-code';
import { StepLayout } from '@/components/StepLayout';
import { Reservation } from '@asw-project/shared/generatedTypes';
import { DialogButton } from '@/components/DialogButton';
import { useState } from 'react';
import { useNotification } from '@/stores/notifications';
import {
  deleteReservation,
  getReservationById,
  getRoomById,
  getSeatById,
} from '../api/reservations';

export const Container = styled(MuiContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const ShowReservation: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { pushNotification } = useNotification();

  const { mutateAsync } = useMutation(() => deleteReservation(id));

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

  const onBack = () => {
    navigate('/reservations');
  };

  const formatTimeSlot = ({ from, to }: Reservation['timeSlot']) =>
    `${from}-${to}`;

  const onConfirmDelete = () =>
    mutateAsync()
      // eslint-disable-next-line no-restricted-globals
      .then(() => {
        navigate('/reservations');
      })
      .then(() =>
        pushNotification({
          message: `Deleted reservation successfully.`,
          severity: 'info',
        }),
      )
      .catch((err) => {
        console.error(err);
        pushNotification({
          message: `Unable to delete reservation, retry later.`,
          severity: 'error',
        });
      });

  return (
    <StepLayout title="View reservation" onBack={onBack}>
      <Container>
        <Box display="flex" justifyContent="center">
          <QRCode value={id} />
        </Box>
        <QueryContent data={reservationData} status={reservationStatus}>
          {(d) => (
            <Box display="flex" flexDirection="column" height="100%">
              <Box flex={1} mt={1}>
                <Typography variant="h6">Date</Typography>
                <Typography variant="body1">
                  {dayjs(d.date).format('MM-DD-YYYY')}
                </Typography>
                <Typography variant="h6">Time</Typography>
                <Typography variant="body1">
                  {formatTimeSlot(d.timeSlot)}
                </Typography>
                <Typography variant="h6">Room</Typography>
                <Typography variant="body1">{roomData?.name}</Typography>
                <Typography variant="h6">Seat</Typography>
                <Typography variant="body1">{seatData?.label}</Typography>
              </Box>
              <DialogButton
                id={id}
                title="Delete reservation?"
                description="Are you sure you want to delete this reservation?"
                autoClose
                isOpen={isDialogOpen}
                setOpen={setDialogOpen}
                onConfirm={onConfirmDelete}
                as={Button}
                fullWidth
                color="secondary"
                variant="outlined"
              >
                Delete
              </DialogButton>
            </Box>
          )}
        </QueryContent>
      </Container>
    </StepLayout>
  );
};
