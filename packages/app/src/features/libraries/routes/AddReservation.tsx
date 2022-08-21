import { StepLayout } from '@/components/StepLayout';
import { safeMap, useQueryParam } from '@/hooks';
import { useToggleSelection } from '@/hooks/useToggleSelection';
import { mergeQueryStatus } from '@/lib/queries';
import { pick } from '@asw-project/shared/util/objects';
import { Box, Button, Container } from '@material-ui/core';

import dayjs, { Dayjs } from 'dayjs';
import { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { Error } from '@/features/misc/routes/Error';
import { prop } from 'lodash/fp';
import { Skeleton } from '@material-ui/lab';
import { getLibraryById, getRooms } from '../api/libraries';
import { getReservationsOnRoom, getRoomById } from '../api/reservations';
import {
  Data as ReservationData,
  ReservationSelect,
} from '../components/ReservationSelect';
import { ReservationFloorPlan } from '../components/ReservationFloorPlan';

const formatHour = (date: Date) => dayjs(date).format('HH:mm');
const hourToString = (from: Date, to: Date) =>
  `${formatHour(from)}-${formatHour(to)}`;

const Body: FC<{ date: Dayjs }> = ({ date }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedRoomAndTimeRange, setSelectedRoomAndTimeRange] = useState<
    [string, string]
  >(['', '']);
  const [selectedRoomId, selectedTimeRange] = selectedRoomAndTimeRange;

  const [selected, setSelected, resetSelection] =
    useToggleSelection<[string, number]>(undefined);

  const [libraryName, setLibraryName] = useState('');

  const { status: selectStatus, data: selectData } = useQuery(
    ['library/reservation', id],
    () => {
      const dayOfWeek = (date.day() - 1 + 7) % 7;
      const roomsData = getRooms(id).then((rooms) =>
        rooms.map(pick('_id', 'name')),
      );
      const libraryData = getLibraryById(id).then(({ name, timetable }) => ({
        name,
        timetable: timetable
          .filter((d) => d.days.includes(dayOfWeek))
          .map(({ slot: { from, to } }) => ({
            key: hourToString(from, to),
            label: hourToString(from, to),
          })),
      }));
      return Promise.all([roomsData, libraryData]);
    },
    {
      onSuccess: ([roomsData, { name, timetable }]) => {
        setLibraryName(name);
        setSelectedRoomAndTimeRange([roomsData[0]._id, timetable[0].key]);
      },
    },
  );

  const { status: roomStatus, data: roomData } = useQuery(
    ['reservation/on', selectedRoomId, selectedTimeRange],
    () =>
      Promise.all([
        getRoomById(selectedRoomId).then(prop('size')),
        getReservationsOnRoom(date.toDate(), selectedRoomId, selectedTimeRange),
      ]),
    {
      enabled: selectedRoomId !== '' && selectedTimeRange !== '',
      onSuccess: resetSelection,
    },
  );

  const mergedStatus = mergeQueryStatus([selectStatus, roomStatus]);
  const mappedSelectData = selectData
    ? ([selectData[0], selectData[1].timetable] as ReservationData)
    : undefined;

  const onSelectChange = (update: [string, string]) => {
    resetSelection();
    setSelectedRoomAndTimeRange(update);
  };

  const handleNext = () => {
    const [from, to] = selectedTimeRange.split('-');
    const roomName = selectData![0].find((x) => x._id === selectedRoomId)!.name;
    const params = [
      ['date', date],
      ['from', from],
      ['to', to],
      ['libraryName', libraryName],
      ['roomId', selectedRoomId],
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
    <StepLayout title="Add reservation">
      <Box
        height="calc(100vh - 64px - 16px)"
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        <Box flex={1} overflow="hidden" mb={2}>
          <Container
            maxWidth="md"
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <ReservationSelect
              status={selectStatus}
              data={mappedSelectData}
              values={selectedRoomAndTimeRange}
              onChange={onSelectChange}
            />
            {
              // eslint-disable-next-line no-nested-ternary
              roomStatus === 'loading' ? (
                <Skeleton variant="rect" height="100%" width="100%" />
              ) : roomStatus === 'error' || roomStatus === 'idle' ? (
                <Box>Could&apos;t find the content you&apos;re looking for</Box>
              ) : (
                <ReservationFloorPlan
                  interactive
                  seatGrid={roomData![1]}
                  selected={selected ? selected[0] : undefined}
                  setSelected={setSelected}
                />
              )
            }
          </Container>
        </Box>
        <Container maxWidth="md">
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            disabled={mergedStatus !== 'success' || selected === undefined}
            onClick={handleNext}
          >
            Next
          </Button>
        </Container>
      </Box>
    </StepLayout>
  );
};

export const AddReservation: FC = () => {
  const date = safeMap((d) => dayjs(parseInt(d, 10)), useQueryParam('date'));
  if (!date.success) {
    return <Error code={400} message="Bad request" />;
  }

  return <Body date={date.value} />;
};
