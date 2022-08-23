import { StepLayout } from '@/components/StepLayout';
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from '@material-ui/core';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useMutation } from 'react-query';
import { confirmReservation } from '../api/reservations';

type State = 'bad_device' | 'scanning' | 'fetching' | 'confirmed' | 'rejected';

const Error: FC<{ message: string }> = ({ message }) => (
  <Typography variant="body1">{message}</Typography>
);

const throttleTime = 5 * 1000;

export const ConfirmReservation: FC = () => {
  const state = useRef<State>('scanning');
  const [stateStr, setStateStr] = useState<State>(state.current);
  const [error, setError] = useState<string>();
  const { mutateAsync, status } = useMutation<void, string, string>(
    'reservation/confirm',
    confirmReservation,
  );

  const sleep = (timer: number) =>
    new Promise((resolve) => setTimeout(resolve, timer));

  const onResult = async (
    readData: { getText(): string } | undefined | null,
  ) => {
    if (state.current === 'scanning') {
      const data = readData?.getText();
      if (data) {
        state.current = 'fetching';
        setStateStr('fetching');
        await Promise.all([sleep(2000), Promise.resolve()]);
        console.log('confirmed!');
        state.current = 'confirmed';
        setStateStr('confirmed');
        setTimeout(() => {
          state.current = 'scanning';
          setStateStr('scanning');
          console.log('back to scanning');
        }, 2000);
      }
    }
  };

  return (
    <StepLayout title="Confirm reservation">
      <Box flex={1} my={2}>
        <Container maxWidth="xs" component={Paper} elevation={2}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box width={250}>
              <QrReader
                constraints={{ facingMode: 'user' }}
                onResult={onResult}
              />
              {stateStr}
            </Box>
          </Box>
        </Container>
      </Box>
    </StepLayout>
  );
};
