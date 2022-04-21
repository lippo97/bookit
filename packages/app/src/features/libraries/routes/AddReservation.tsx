import { Layout } from '@/components/Layout';
import { QueryContent } from '@/components/QueryContent';
import { getLibraryById } from '@/features/dashboard/api/libraries';
import { getReservations } from '@/features/dashboard/api/reservations';
import { getSeats } from '@/features/dashboard/api/seats';
import { useQueryParams } from '@/hooks';
import {
  Box,
  Button,
  Container as MuiContainer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from '@material-ui/core';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getRooms } from '../api/libraries';
import { getReservationsOnRoom, getRoomById } from '../api/reservations';

export const renderSelect = (
  items: any[],
  label: string,
  value: string,
  setValue: (s: string) => void,
) => {
  const labelId = `${label}-label`;

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        label={label}
        value={value}
        onChange={(e) => setValue(e.target.value as string)}
      >
        {items.map(([key, value]) => (
          <MenuItem value={key}>{value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const Container = styled(MuiContainer)(() => ({}));

const Form = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  '& > *': {
    marginBottom: theme.spacing(2),
  },
  '& > *:last-child': {
    marginBottom: 0,
  },
}));

const formatHour = (date: Date) => dayjs(date).format('HH:mm');

export const AddReservation = () => {
  const { id } = useParams();
  const date = useQueryParams('date', '');
  const [room, setRoom] = useState('');
  const [time, setTime] = useState('');
  const { status, data } = useQuery(
    ['library/reservation', id],
    () => {
      const parsedDate = dayjs(parseInt(date, 10));
      const dayOfWeek = (parsedDate.day() - 1 + 7) % 7;
      const roomsData = getRooms(id).then((rooms) =>
        rooms.map(({ _id, name }) => [_id, name]),
      );
      const timetableData = getLibraryById(id).then(({ timetable }) =>
        timetable
          .filter((y) => y.days.includes(dayOfWeek))
          .map(({ slot: { from, to } }) => [formatHour(from), formatHour(to)])
          .map(([from, to]) => [`${from}-${to}`, `${from}-${to}`]),
      );

      return Promise.all([roomsData, timetableData]);
    },
    {
      onSuccess: ([roomsData, timetableData]) => {
        setRoom(roomsData[0][0]);
        setTime(timetableData[0][0]);
      },
    },
  );

  const {} = useQuery(
    ['reservation/on', room, time],
    () =>
      Promise.all([
        getRoomById(room).then((x) => [10, 10]),
        getReservationsOnRoom(room, time),
      ]),
    {
      enabled: room !== '' && time !== '',
    },
  );

  return (
    <Layout>
      <QueryContent status={status} data={data}>
        {([rooms, timetable]) => (
          <Container>
            <Form>
              {renderSelect(rooms, 'Room', room, setRoom)}
              {renderSelect(timetable, 'Time', time, setTime)}
              <Button variant="outlined" fullWidth>
                Send
              </Button>
            </Form>
          </Container>
        )}
        {/* {([rooms, { timetable }]) => (
          <Picker data={rooms} format={(r) => r.name}>
            {(r) => (
              <Picker data={['08-12', '13-18']} format={identity}>
                {(t) => (
                  <div>
                    {r.name} at {t}
                  </div>
                )}
              </Picker>
            )}
          </Picker>
        )} */}
      </QueryContent>
    </Layout>
  );
};
