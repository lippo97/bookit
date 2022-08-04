import { WithId } from '@asw-project/shared/data/withId';
import { Reservation } from '@asw-project/shared/generatedTypes';
import {
  Card as MuiCard,
  Box,
  CardMedia,
  CardContent,
  Button,
  styled,
  Typography,
} from '@material-ui/core';
import dayjs from 'dayjs';
import TimeIcon from '@material-ui/icons/AccessTime';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import { Link as RouterLink } from 'react-router-dom';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { getLibraryById } from '../api/libraries';

interface ReservationListItemProps {
  readonly data: WithId<Reservation>;
}

const Card = styled(MuiCard)(({ theme }) => ({
  padding: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const Title = styled(Typography)({
  fontSize: 16,
});

const Secondary = styled(Typography)({
  fontSize: 16,
});

export const ReservationListItem: FC<ReservationListItemProps> = ({
  data: {
    _id,
    libraryId,
    date: _date,
    timeSlot: { from, to },
  },
}) => {
  const date = dayjs(_date);
  const { data, status } = useQuery(['library', libraryId], () =>
    getLibraryById(libraryId),
  );
  if (status === 'success') {
    return (
      <Card key={_id} elevation={2}>
        <Box display="flex" flexDirection="row">
          <CardMedia
            image={data!.imageFileName}
            style={{ width: '100px', height: 'auto' }}
          />
          <Box flex="1">
            <CardContent style={{ paddingTop: 0 }}>
              <Title variant="h5">{data!.name}</Title>
              <Box display="flex" flexDirection="row">
                <CalendarIcon
                  color="inherit"
                  style={{ fontSize: 18, marginTop: '2px' }}
                />
                <Secondary color="textPrimary" style={{ marginLeft: 3 }}>
                  {date.format('MM/DD')}
                </Secondary>
              </Box>
              <Box display="flex" flexDirection="row">
                <TimeIcon
                  color="inherit"
                  style={{ fontSize: 18, marginTop: '2px' }}
                />
                <Secondary color="textPrimary" style={{ marginLeft: 3 }}>
                  {from} - {to}
                </Secondary>
              </Box>
            </CardContent>
            <Box display="flex" flexDirection="row" justifyContent="flex-end">
              <Button
                size="small"
                color="primary"
                component={RouterLink}
                to={`/reservations/${_id}`}
              >
                View
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    );
  }
  return <></>;
};
