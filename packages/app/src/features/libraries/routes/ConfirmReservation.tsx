import { StepLayout } from '@/components/StepLayout';
import { Error } from '@/features/misc';
import { every6, map2, safeMap, useQueryParam } from '@/hooks';
import { useNotification } from '@/stores/notifications';
import {
  Box,
  Button,
  Card,
  Container,
  styled,
  Typography,
} from '@material-ui/core';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { createReservation } from '../api/reservations';

const parseDate = (str: number) => dayjs(str);
const parseTime = (str: string) => dayjs(str, 'HH:mm');
const parseNumber = (str: string) => parseInt(str, 10);

const formatTime = (time: Dayjs) => time.format('HH:mm');

const Label = styled(Typography)({
  fontSize: '10px',
});

export const ConfirmReservation: React.FC = () => {
  const { id } = useParams();
  const { pushNotification } = useNotification();
  const navigate = useNavigate();
  const date = safeMap(parseDate, safeMap(parseNumber, useQueryParam('date')));
  const from = safeMap(parseTime, useQueryParam('from'));
  const to = safeMap(parseTime, useQueryParam('to'));
  const roomId = useQueryParam('roomId');
  const roomName = useQueryParam('roomName');
  const seatId = useQueryParam('seatId');
  const seatName = useQueryParam('seatName');

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

    const handleSubmit = () => {
      createReservation({
        date: date.toDate(),
        timeSlot: {
          from: timeSlot.from.format('HH:mm'),
          to: timeSlot.to.format('HH:mm'),
        },
        roomId,
        seatId,
        libraryId: id,
      })
        // eslint-disable-next-line @typescript-eslint/no-shadow
        .then(({ _id: id }) => {
          pushNotification({
            message: 'Added reservation successfully.',
            severity: 'success',
          });
          navigate(`/reservations/${id}`);
        })
        .catch((err) => {
          console.error(err);
          pushNotification({
            message: 'Unable to create the reservation, retry later.',
            severity: 'error',
          });
        });
    };

    return (
      <StepLayout title="Add reservation" subtitle="Confirm your reservation">
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Container>
            <Typography variant="h5" style={{ margin: '16px 0' }}>
              Reservation details
            </Typography>
            <Card elevation={2} style={{ padding: '16px' }}>
              <Label>Date</Label>
              <Typography variant="body1">
                {date.format('MM-DD-YYYY')}
              </Typography>
              <Label>Time</Label>
              <Typography variant="body1">{`${formatTime(
                timeSlot.from,
              )}-${formatTime(timeSlot.to)}`}</Typography>
              <Label>Room</Label>
              <Typography variant="body1">{roomName}</Typography>
              <Label>Seat</Label>
              <Typography variant="body1">{seatName}</Typography>
            </Card>
          </Container>
          <Container>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Confirm reservation
            </Button>
          </Container>
        </Box>
      </StepLayout>
    );
  }
  return <Error code={400} message="Bad request" />;
};
