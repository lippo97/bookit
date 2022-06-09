import { Layout } from '@/components/Layout';
import { QueryContent } from '@/components/QueryContent';
import {
  Box,
  Button,
  Container as MuiContainer,
  styled,
  Typography,
} from '@material-ui/core';
import { useQuery } from 'react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import QRCode from 'react-qr-code';
import { StepLayout } from '@/components/StepLayout';
import { getReservationById } from '../api/reservations';

export const Container = styled(MuiContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const ShowReservation: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, status } = useQuery(['reservation', id], () =>
    getReservationById(id),
  );

  const onBack = () => {
    navigate('/reservations');
  };

  return (
    <StepLayout title="View reservation" onBack={onBack}>
      <Container>
        <Box display="flex" justifyContent="center">
          <QRCode value={id} />
        </Box>
        <QueryContent data={data} status={status}>
          {(d) => (
            <Box display="flex" flexDirection="column" height="100%">
              <Box flex={1}>
                <Typography variant="h6">Date</Typography>
                <Typography variant="body1">
                  {dayjs(d.date).format('MM-DD-YYYY')}
                </Typography>
              </Box>
              <Button fullWidth color="secondary" variant="outlined">
                Delete
              </Button>
            </Box>
          )}
        </QueryContent>
      </Container>
    </StepLayout>
  );
};
