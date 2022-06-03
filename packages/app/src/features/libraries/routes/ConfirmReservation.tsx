import { StepLayout } from '@/components/StepLayout';
import { Error } from '@/features/misc';
import {
  every4,
  every5,
  every6,
  map2,
  safeMap,
  useQueryParam,
  useQueryParams,
} from '@/hooks';
import { Box, Button, Container, Typography } from '@material-ui/core';
import dayjs, { Dayjs } from 'dayjs';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { createReservation } from '../api/reservations';

const parseDate = (str: number) => dayjs(str);
const parseTime = (str: string) => dayjs(str, 'HH:mm');
const parseNumber = (str: string) => parseInt(str, 10);

const formatTime = (time: Dayjs) => time.format('HH:mm');

export const ConfirmReservation: React.FC = () => {
  const { id } = useParams();
  const date = safeMap(parseDate, safeMap(parseNumber, useQueryParam('date')));
  const from = safeMap(parseTime, useQueryParam('from'));
  const to = safeMap(parseTime, useQueryParam('to'));
  const roomId = useQueryParam('roomId');
  const roomName = useQueryParam('roomName');
  const seatId = useQueryParam('seatId');
  const seatName = useQueryParam('seatName');

  const query = useQuery(() => {
    createReservation(0 as any);
  });

  const timeSlot = map2(
    from,
    to,
  )((f, t) => ({
    from: f,
    to: t,
  }));

  const params = every6([date, timeSlot, roomId, roomName, seatId, seatName]);

  if (params.success) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const [date, timeSlot, roomId, roomName, seatId, seatName] = params.value;

    return (
      <StepLayout title="Add reservation" subtitle="Confirm your reservation">
        <Container>
          <Box display="flex" flexDirection="column" height="100%">
            <Box flex={1}>
              <Typography variant="h5">Reservation details</Typography>
              <Typography variant="h6">Date</Typography>
              <Typography variant="body1">
                {date.format('MM-DD-YYYY')}
              </Typography>
              <Typography variant="h6">Time</Typography>
              <Typography variant="body1">{`${formatTime(
                timeSlot.from,
              )}-${formatTime(timeSlot.to)}`}</Typography>
              <Typography variant="h6">Room</Typography>
              <Typography variant="body1">{roomName}</Typography>
              <Typography variant="h6">Seat</Typography>
              <Typography variant="body1">{seatName}</Typography>
            </Box>
            <Button variant="outlined" fullWidth>
              Confirm reservation
            </Button>
          </Box>
        </Container>
      </StepLayout>
    );
  }

  return <Error code={400} message="Bad request" />;
};
