import { WithId } from '@asw-project/shared/data/withId';
import {
  Library,
  Reservation,
  Room,
  Seat,
} from '@asw-project/shared/generatedTypes';
import { Box, styled, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import dayjs from 'dayjs';

interface ReservationInfoProps {
  readonly data?: WithId<Reservation>;
  readonly seatData?: Pick<Seat, 'label'>;
  readonly roomData?: Pick<Room, 'name'>;
  readonly libraryData?: Pick<Library, 'name'>;
  readonly status: 'success' | 'idle' | 'loading' | 'error';
}

const formatTimeSlot = ({ from, to }: Reservation['timeSlot']) =>
  `${from}-${to}`;

const Error = () => (
  <>
    <Typography variant="h5">Error 404</Typography>
    <Typography variant="h6">
      Couldn&apos;t find the content you&apos;re looking for.
    </Typography>
  </>
);

const Label = styled(Typography)({
  fontSize: '10px',
});

export const ReservationInfo: React.FC<ReservationInfoProps> = ({
  data,
  roomData,
  seatData,
  libraryData,
  status,
}: ReservationInfoProps) => {
  const Content = () => {
    if (status === 'error') {
      return <Error />;
    }
    if (status === 'idle' || status === 'loading') {
      return (
        <>
          <Skeleton variant="text" height={15} />
          <Skeleton variant="text" height={24} />
          <Skeleton variant="text" height={15} />
          <Skeleton variant="text" height={24} />
          <Skeleton variant="text" height={15} />
          <Skeleton variant="text" height={24} />
          <Skeleton variant="text" height={15} />
          <Skeleton variant="text" height={24} />
          <Skeleton variant="text" height={15} />
          <Skeleton variant="text" height={24} />
        </>
      );
    }
    const { date, timeSlot } = data!;
    return (
      <>
        <Label>Library</Label>
        <Typography variant="body1">{libraryData?.name}</Typography>
        <Label>Room</Label>
        <Typography variant="body1">{roomData?.name}</Typography>
        <Label>Seat</Label>
        <Typography variant="body1">{seatData?.label}</Typography>
        <Label>Date</Label>
        <Typography variant="body1">
          {dayjs(date).format('MM-DD-YYYY')}
        </Typography>
        <Label>Time</Label>
        <Typography variant="body1">{formatTimeSlot(timeSlot)}</Typography>
      </>
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      margin="16 auto 0"
      width={256}
    >
      <Content />
    </Box>
  );
};
