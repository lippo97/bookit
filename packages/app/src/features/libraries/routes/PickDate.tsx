import { Layout } from '@/components/Layout';
import { DatePicker } from '@material-ui/pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import {
  Box,
  Button,
  Container as MuiContainer,
  Paper as MuiPaper,
  styled,
  Typography,
} from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { QueryContent } from '@/components/QueryContent';
import { LibraryHeader } from '../components/LibraryHeader';
import { getLibraryById } from '../api/libraries';

const Paper = styled(MuiPaper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  '& > *': {
    marginBottom: theme.spacing(2),
  },
}));

const Container = styled(MuiContainer)(({ theme }) => ({
  //   padding: theme.spacing(2, 0),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  '& > *': {
    marginBottom: theme.spacing(2),
  },
}));

export const PickDate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const { data, status } = useQuery(['library', id], () => getLibraryById(id));

  const handleBack = () => {
    navigate(-1);
  };
  const handleNext = () => {
    navigate(`/libraries/${id}/reservation?date=${date}`);
  };

  return (
    <Layout transparentAppBar>
      <QueryContent data={data} status={status}>
        {(d) => (
          <>
            <LibraryHeader src={d.imageFileName} />
            <Container>
              <Typography variant="h5">Pick a date</Typography>
              <DatePicker
                autoOk
                label="Reservation date"
                openTo="date"
                value={date}
                onChange={setDate}
              />
              <Box display="flex" flexDirection="row" justifyContent="flex-end">
                <Button
                  variant="outlined"
                  style={{ marginRight: 8 }}
                  onClick={handleBack}
                >
                  Cancel
                </Button>
                <Button color="primary" variant="outlined" onClick={handleNext}>
                  Next
                </Button>
              </Box>
            </Container>
          </>
        )}
      </QueryContent>
    </Layout>
  );

  //   return (
  //     <Layout extendedAppBar>
  //       <Container maxWidth="md">
  //         <Paper elevation={3}>
  //           <Typography variant="h5">Pick a date</Typography>
  //           <DatePicker
  //             autoOk
  //             label="Reservation date"
  //             openTo="date"
  //             value={date}
  //             onChange={setDate}
  //           />
  //           <Box display="flex" flexDirection="row" justifyContent="flex-end">
  //             <Button
  //               variant="outlined"
  //               style={{ marginRight: 8 }}
  //               onClick={handleBack}
  //             >
  //               Cancel
  //             </Button>
  //             <Button color="primary" variant="outlined" onClick={handleNext}>
  //               Next
  //             </Button>
  //           </Box>
  //         </Paper>
  //       </Container>
  //     </Layout>
  //   );
};
