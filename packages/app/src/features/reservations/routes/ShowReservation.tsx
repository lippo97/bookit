import { Layout } from '@/components/Layout';
import { QueryContent } from '@/components/QueryContent';
import {
  Box,
  Button,
  Container as MuiContainer,
  Paper,
  styled,
  Typography,
} from '@material-ui/core';
import { useMutation, useQueries, useQuery } from 'react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import QRCode from 'react-qr-code';
import { StepLayout } from '@/components/StepLayout';
import { Reservation } from '@asw-project/shared/generatedTypes';
import { DialogButton } from '@/components/DialogButton';
import { useState } from 'react';
import { useNotification } from '@/stores/notifications';
import { WithId } from '@asw-project/shared/data/withId';
import { mergeQueryStatus } from '@/lib/queries';
import {
  deleteReservation,
  getReservationById,
  getRoomById,
  getSeatById,
} from '../api/reservations';
import { QR } from '../components/QR';
import ReservationInfo from '../components/ReservationInfo';
import { getLibraryById } from '../api/libraries';
import { DeleteButton } from '../components/DeleteButton';

export const Container = styled(MuiContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const ShowReservation: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  return (
    <StepLayout title="View reservation" onBack={onBack}>
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Container maxWidth="sm">
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
        <Container maxWidth="sm">
          <DeleteButton status={status} id={id} />
        </Container>
      </Box>
    </StepLayout>
  );
};
