import { Layout } from '@/components/Layout';
import { QueryContent } from '@/components/QueryContent';
import { WithId } from '@asw-project/shared/data/withId';
import { Reservation } from '@asw-project/shared/generatedTypes';
import {
  Box,
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import FilterListIcon from '@material-ui/icons/FilterList';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { ChangeEvent, useState } from 'react';
import { getLibraryById } from '../api/libraries';
import { getReservations } from '../api/reservations';
import { ReservationList } from '../components/ReservationList';

export const AllReservations: React.FC = () => {
  const [display, setDisplay] = useState<'current' | 'previous'>('current');
  const { data, status } = useQuery(['reservations', display], () =>
    getReservations(display === 'current'),
  );

  const handleChange = (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => setDisplay(event.target.value as any);

  return (
    <Layout>
      <Container>
        <Box display="flex" justifyContent="space-between" my={2}>
          <Typography variant="h5" style={{ paddingBottom: '7px' }}>
            Reservations
          </Typography>
          <Select
            labelId="select-display-label"
            id="select-display"
            value={display}
            onChange={handleChange}
            disableUnderline
            SelectDisplayProps={{
              style: {
                paddingRight: 32,
              },
            }}
            IconComponent={FilterListIcon}
          >
            <MenuItem value="current">Current</MenuItem>
            <MenuItem value="previous">Previous</MenuItem>
          </Select>
        </Box>
        <ReservationList status={status} data={data} />
      </Container>
    </Layout>
  );
};
