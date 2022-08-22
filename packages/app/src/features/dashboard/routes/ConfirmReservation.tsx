import { StepLayout } from '@/components/StepLayout';
import { Box, Container, Typography } from '@material-ui/core';
import { FC, useState } from 'react';
import { QrReader } from 'react-qr-reader';

type Result =
  | {
      data?: never;
      error?: never;
      idle: boolean;
    }
  | {
      data: string;
      error?: never;
    }
  | {
      data?: never;
      error: string;
    };

const Error: FC<{ message: string }> = ({ message }) => (
  <Typography variant="body1">{message}</Typography>
);

export const ConfirmReservation: FC = () => {
  const [data, setData] = useState<Result>({
    idle: true,
  });
  const onResult = (
    readData: { getText(): string } | undefined | null,
    error: Error | undefined | null,
  ) => {
    if (!error && !!readData?.getText()) {
      setData({ data: readData.getText() });
    }
    setData({ error: error!.message });
  };
  return (
    <StepLayout title="Confirm reservation">
      <Box flex={1} my={2}>
        <Container maxWidth="md">
          {data.error ? (
            <Error message={data.error} />
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
