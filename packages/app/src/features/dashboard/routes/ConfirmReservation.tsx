import { StepLayout } from '@/components/StepLayout';
import { Box, Container, Typography } from '@material-ui/core';
import { FC, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useMutation } from 'react-query';
import { confirmReservation } from '../api/reservations';

type State = 'bad_device' | 'idle' | 'loading' | 'confirmed' | 'rejected';

const Error: FC<{ message: string }> = ({ message }) => (
  <Typography variant="body1">{message}</Typography>
);

export const ConfirmReservation: FC = () => {
  const [result, setResult] = useState<State>('idle');
  const [error, setError] = useState<string>();
  const { mutateAsync } = useMutation<void, string, string>(
    'reservation/confirm',
    confirmReservation,
  );

  const onResult = (
    readData: { getText(): string } | undefined | null,
    err: Error | undefined | null,
  ) => {
    setError(undefined);
    if (!err && !!readData?.getText()) {
      mutateAsync(readData?.getText())
        .then(() => setResult('confirmed'))
        // eslint-disable-next-line @typescript-eslint/no-shadow
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
          setResult('rejected');
        });
    }
    setResult('bad_device');
    setError(err?.message);
  };

  return (
    <StepLayout title="Confirm reservation">
      <Box flex={1} my={2}>
        <Container maxWidth="md">
          {result === 'bad_device' ? (
            <Error message={error!} />
          ) : (
            <QrReader
              constraints={{ facingMode: 'user' }}
              onResult={onResult}
            />
          )}
        </Container>
      </Box>
    </StepLayout>
  );
};
