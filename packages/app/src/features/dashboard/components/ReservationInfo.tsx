import { QueryContent } from '@/components/QueryContent';
import { getLibraryById } from '@/features/libraries/api/libraries';
import { WithId } from '@asw-project/shared/data/withId';
import { Reservation } from '@asw-project/shared/generatedTypes';
import { Box, Paper, styled, Typography } from '@material-ui/core';
import { FormatIndentDecreaseTwoTone } from '@material-ui/icons';
import dayjs from 'dayjs';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { getRoomById } from '../api/rooms';
import { getSeatById } from '../api/seats';

interface ReservationInfoProps {
  readonly data?: WithId<Reservation>;
}

const formatTimeSlot = ({ from, to }: Reservation['timeSlot']) =>
  `${from}-${to}`;

const formatDate = (date: string) => dayjs(date).format('MM-DD-YYYY');

const Label = styled(Typography)({
  fontSize: '10px',
});

const Body: FC<Required<ReservationInfoProps>> = ({
  data: { libraryId, roomId, seatId, timeSlot, date },
}) => {
  const { status, data } = useQuery(
    ['reservation/info', libraryId, roomId, seatId],
    () =>
      Promise.all([
        getLibraryById(libraryId),
        getRoomById(roomId),
        getSeatById(seatId),
      ]),
  );
  return (
    <QueryContent data={data} status={status}>
      {([library, room, seat]) => (
        <Paper elevation={2} style={{ marginTop: 16, padding: 32 }}>
          <Typography variant="h6">Reservation Info</Typography>
          <Label>Library</Label>
          <Typography variant="body1">{library.name}</Typography>
          <Label>Room</Label>
          <Typography variant="body1">{room.name}</Typography>
          <Label>Seat</Label>
          <Typography variant="body1">{seat.label}</Typography>
          <Label>Date</Label>
          <Typography variant="body1">{formatDate(date as any)}</Typography>
          <Label>Time</Label>
          <Typography variant="body1">{formatTimeSlot(timeSlot)}</Typography>
        </Paper>
      )}
    </QueryContent>
  );
};

export const ReservationInfo: FC<ReservationInfoProps> = ({ data }) =>
  data === undefined ? <></> : <Body data={data} />;
