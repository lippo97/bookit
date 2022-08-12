import { StepLayout } from '@/components/StepLayout';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const PickDate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const handleNext = () => {
    navigate(`/libraries/${id}/reservation?date=${date?.startOf('day')}`);
  };

  return (
    <StepLayout title="Add reservation" subtitle="Pick a date">
      <Box flex={1} mt={2}>
        <Container>
          <Typography variant="h5" style={{ marginBottom: '16px' }}>
            Pick a date
          </Typography>
          <DatePicker
            autoOk
            disableToolbar
            label="Reservation date"
            openTo="date"
            variant="static"
            value={date}
            onChange={setDate}
          />
        </Container>
      </Box>
      <Container>
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          onClick={handleNext}
        >
          Next
        </Button>
      </Container>
    </StepLayout>
  );
};
