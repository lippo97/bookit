import { Layout } from '@/components/Layout';
import { Service } from '@asw-project/shared/generatedTypes';
import { QueryContent } from '@/components/QueryContent';
import { getLibraryById } from '@/features/dashboard/api/libraries';
import { getReservations } from '@/features/dashboard/api/reservations';
import { getSeats } from '@/features/dashboard/api/seats';
import { iconForServiceCurried } from '@/features/dashboard/components/FloorMap/Seat';
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
  TextField,
} from '@material-ui/core';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useToggleSelection } from '@/hooks/useToggleSelection';
import { StepLayout } from '@/components/StepLayout';
import { SettingsSystemDaydreamRounded } from '@material-ui/icons';
import { getRooms } from '../api/libraries';
import {
  getReservationsOnRoom,
  getRoomById,
  SeatWithReservation,
} from '../api/reservations';
import { Window } from '../components/Window';

const renderSelect = (
  items: any[],
  label: string,
  value: string,
  setValue: (s: string) => void,
) => {
  const labelId = `${label}-label`;

  return (
    <FormControl fullWidth>
      <TextField
        select
        label={label}
        value={value}
        onChange={(e) => setValue(e.target.value as string)}
      >
        {items.map(([key, value]) => (
          <MenuItem value={key} key={key}>
            {value}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

const renderReservations = (
  seats: SeatWithReservation[],
  selected: [string, number] | null,
  setSelected: (n: [string, number]) => void,
) =>
  seats.map(({ isReserved, label, position, services, _id: seatId }) => (
    <Box
      width={51}
      height={51}
      bgcolor={isReserved ? '#ccc' : '#fff'}
      position="absolute"
      top={position.y * 50}
      left={position.x * 50 - 1}
      border={
        selected !== null && selected[1] === label
          ? '2px solid #444'
          : '1px solid #aaa'
      }
      onClick={!isReserved ? () => setSelected([seatId, label]) : undefined}
    >
      <Box display="flex" flexDirection="column" height="100%" p="1px">
        <span style={{ fontWeight: 'bold' }}>{label}</span>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="flex-end"
          alignItems="flex-end"
          flex={1}
        >
          {services
            .map((s) => s as Service)
            .map(
              iconForServiceCurried({
                height: 12,
                width: 12,
                marginLeft: 2,
              }),
            )}
        </Box>
      </Box>
    </Box>
  ));

const Container = styled(MuiContainer)(({ theme }) => ({
  // position: 'absolute',
  // top: 0,
  // bottom: theme.spacing(4),
}));

const Form = styled(Box)(({ theme }) => ({
  // height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: theme.spacing(2, 0),
  '& > *': {
    marginBottom: theme.spacing(2),
  },
  // '& > *:last-child': {
  //   marginBottom: 0,
  // },
}));

const formatHour = (date: Date) => dayjs(date).format('HH:mm');

export const AddReservation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const date = useQueryParams('date', '');
  const parsedDate = dayjs(parseInt(date, 10));
  const [room, setRoom] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [selected, setSelected, resetSelection] =
    useToggleSelection<[string, number]>(null);
  const { status, data } = useQuery(
    ['library/reservation', id],
    () => {
      const dayOfWeek = (parsedDate.day() - 1 + 7) % 7;
      const roomsData = getRooms(id).then((rooms) =>
        rooms.map(({ _id, name }) => [_id, name]),
      );
      const libraryData = getLibraryById(id).then(
        ({ name, timetable }) =>
          [
            name,
            timetable
              .filter((y) => y.days.includes(dayOfWeek))
              .map(({ slot: { from, to } }) => [
                formatHour(from),
                formatHour(to),
              ])
              .map(([from, to]) => [`${from}-${to}`, `${from}-${to}`]),
          ] as [string, string[][]],
      );

      return Promise.all([roomsData, libraryData]);
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      onSuccess: ([roomsData, [name, timetableData]]) => {
        setName(name);
        setRoom(roomsData[0][0]);
        setTime(timetableData[0][0]);
      },
    },
  );

  const { status: roomStatus, data: roomData } = useQuery(
    ['reservation/on', room, time],
    () =>
      Promise.all([
        getRoomById(room).then(
          ({ size: { x, y } }) => [x, y] as [number, number],
        ),
        getReservationsOnRoom(parsedDate.toDate(), room, time),
      ]),
    {
      enabled: room !== '' && time !== '',
      onSuccess: resetSelection,
    },
  );

  const mergedData =
    data !== undefined && roomData !== undefined
      ? ([data[0], ...data[1], ...roomData] as [
          string[][],
          string,
          string[][],
          [number, number],
          SeatWithReservation[],
        ])
      : undefined;

  /* eslint-disable no-nested-ternary */
  const mergedStatus =
    status === 'success' && roomStatus === 'success'
      ? 'success'
      : status === 'loading' || roomStatus === 'loading'
      ? 'loading'
      : 'error';

  const handleNext = () => {
    const [from, to] = time.split('-');
    const roomName = data![0].find((x) => x[0] === room)![1];
    const params = [
      ['date', parsedDate],
      ['from', from],
      ['to', to],
      ['libraryName', name],
      ['roomId', room],
      ['roomName', roomName],
      ['seatId', selected![0]],
      ['seatName', selected![1]],
    ] as [string, any][];
    const queryParams = params
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    navigate(`confirm?${queryParams}`);
  };

  return (
    <StepLayout title="Add reservation" subtitle="Select a seat">
      <QueryContent status={mergedStatus} data={mergedData}>
        {([rooms, , timetable, size, seats]) => (
          <Box flex={1} display="flex" flexDirection="column">
            <Box flex={1}>
              <Container>
                <Form>
                  {renderSelect(rooms, 'Room', room, setRoom)}
                  {renderSelect(timetable, 'Time', time, setTime)}
                  <Window>
                    <div
                      style={{
                        display: 'flex',
                      }}
                    >
                      <Box
                        position="relative"
                        width={size[0] * 50}
                        height={size[1] * 50}
                        bgcolor="#fff"
                      >
                        <div
                          style={{
                            height: '100%',
                            backgroundSize: '50px 50px',
                            backgroundImage: `linear-gradient(to right, #ddd 1px, transparent 1px),  linear-gradient(to bottom, #ddd 1px, transparent 1px)`,
                            backgroundRepeat: 'repeat',
                            margin: '-1px 0 0 -1px',
                            borderBottom: '1px solid #ddd',
                          }}
                        />
                        {renderReservations(seats, selected, setSelected)}
                      </Box>
                    </div>
                  </Window>
                </Form>
              </Container>
            </Box>
            <Container>
              <Button
                variant="outlined"
                fullWidth
                disabled={selected === null}
                onClick={handleNext}
              >
                Next
              </Button>
            </Container>
          </Box>
        )}
      </QueryContent>
    </StepLayout>
  );
};
