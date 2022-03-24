import { Layout } from '@/components/Layout';
import { QueryContent } from '@/components/QueryContent';
import { getLibraryById } from '@/features/dashboard/api/libraries';
import { useQueryParams } from '@/hooks';
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import dayjs from 'dayjs';
import { identity } from 'lodash';
import { ChangeEvent, MutableRefObject, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getRooms } from '../api/libraries';
import { Picker } from '../components/Picker';

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

const formatHour = (date: Date) => dayjs(date).format('HH:mm');

export const AddReservation = () => {
  const { id } = useParams();
  const date = useQueryParams('date', '');
  const { status, data } = useQuery(['library/reservation', id], () => {
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
  });

  const [room, setRoom] = useState('');
  const [time, setTime] = useState('');

  const {} = useQuery(
    ['reservation/on', room, time],
    () => Promise.resolve(1),
    {
      enabled: room !== '' && time !== '',
    },
  );

  return (
    <Layout>
      <QueryContent status={status} data={data}>
        {([rooms, timetable]) => (
          <Container>
            <Box mt={2} mb={2}>
              {renderSelect(rooms, 'Room', room, setRoom)}
              {renderSelect(timetable, 'Time', time, setTime)}
            </Box>
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
