import { Layout } from '@/components/Layout';
import { QueryContent } from '@/components/QueryContent';
import { WithId } from '@asw-project/shared/data/withId';
import { Reservation } from '@asw-project/shared/generatedTypes';
import {
  Box,
  Card as MuiCard,
  CardContent,
  CardMedia,
  Container,
  styled,
  Typography,
} from '@material-ui/core';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { getLibraryById } from '../api/libraries';
import { getReservations } from '../api/reservations';

const Card = styled(MuiCard)(({ theme }) => ({
  padding: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: 16,
}));

const Secondary = styled(Typography)(({ theme }) => ({
  fontSize: 16,
}));

const renderReservation = ({
  _id,
  libraryId,
  date: _date,
  timeSlot: { from, to },
}: WithId<Reservation>) => {
  const date = dayjs(_date);
  const { data, status } = useQuery(['library', libraryId], () =>
    getLibraryById(libraryId),
  );
  return (
    <Card elevation={2}>
      {status === 'success' ? (
        <Box display="flex" flexDirection="row">
          <CardMedia
            image={data!.imageFileName}
            style={{ width: '100px', height: 'auto' }}
          />
          <CardContent>
            <Title variant="h6">{data!.name}</Title>
            <Box>
              <Secondary color="textSecondary" gutterBottom>
                {from} - {to}
              </Secondary>
              <Title variant="h6">{date.format('MM/DD')}</Title>
            </Box>
          </CardContent>
        </Box>
      ) : (
        // <Box display="flex" flexDirection="row">
        //   <Box flex={1}>Biblioteca San Giovanni</Box>
        //   <Box>
        //     <Typography color="textSecondary" gutterBottom>
        //       {from} - {to}
        //     </Typography>
        //     <Typography variant="h5">{date.format('MM/DD')}</Typography>
        //   </Box>
        // </Box>
        <div>dicoa</div>
      )}
    </Card>
  );
};

export const AllReservations: React.FC = () => {
  const { data, status } = useQuery(['reservations'], () => getReservations());

  return (
    <Layout>
      <Container>
        <QueryContent status={status} data={data}>
          {(d) => d.map(renderReservation)}
        </QueryContent>
      </Container>
    </Layout>
  );
};
