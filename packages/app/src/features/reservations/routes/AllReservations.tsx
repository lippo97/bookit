import { Layout } from '@/components/Layout';
import {
  Box,
  Container,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';
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
      <Container maxWidth="md">
        <Box display="flex" justifyContent="space-between" mt={2} mb="9px">
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
