import { StepLayout } from '@/components/StepLayout';
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from '@material-ui/core';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import CropFreeIcon from '@material-ui/icons/CropFree';
import CrossIcon from '@material-ui/icons/Clear';
import LoadingIcon from '@material-ui/icons/HourglassEmpty';
import CameraIcon from '@material-ui/icons/Camera';
import { QrReader } from 'react-qr-reader';
import { useMutation } from 'react-query';
import { useNotification } from '@/stores/notifications';
import { confirmReservation } from '../api/reservations';

type State =
  | 'initial'
  | 'bad_device'
  | 'scanning'
  | 'fetching'
  | 'confirmed'
  | 'rejected';

const throttleTime = 5 * 1000;

const ScannerPlaceholder: FC = () => (
  <Box
    width={250}
    height={250}
    bgcolor="#efefef"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
  >
    <CameraIcon style={{ marginBottom: 8, color: '#333' }} />
    <Typography variant="body2" style={{ color: '#333' }}>
      Unable to access the camera.
    </Typography>
  </Box>
);

const ScanOverlay: FC<{ state: State }> = ({ state }) => {
  const style = {
    position: 'absolute',
    width: 200,
    height: 200,
    top: 25,
    left: 25,
  } as const;
  switch (state) {
    case 'scanning':
      return <CropFreeIcon style={style} />;
    case 'rejected':
      return <CrossIcon style={style} />;
    case 'fetching':
      return <LoadingIcon style={style} />;
    case 'confirmed':
      return <CropFreeIcon style={{ ...style, color: 'green' }} />;
    default:
      return <></>;
  }
};

const Message: FC<{ state: State }> = ({ state }) => {
  switch (state) {
    case 'scanning':
      return (
        <Typography variant="body1">
          Frame the QR code into the camera.
        </Typography>
      );
    case 'fetching':
      return <Typography variant="body1">Checking...</Typography>;
    default:
      return <></>;
  }
};

export const ConfirmReservation: FC = () => {
  const state = useRef<State>('initial');
  const [stateStr, setStateStr] = useState<State>(state.current);
  const { pushNotification } = useNotification();
  const { mutateAsync, status } = useMutation<void, string, string>(
    'reservation/confirm',
    confirmReservation,
    {
      onSuccess: () => {
        pushNotification({
          message: 'Reservation confirmed successfully.',
          severity: 'success',
        });
      },
      onError: () => {
        pushNotification({
          message: 'Unable to confirm reservation.',
          severity: 'error',
        });
      },
    },
  );

  const sleep = (timer: number) =>
    new Promise((resolve) => setTimeout(resolve, timer));

  const onResult = async (
    readData: { getText(): string } | undefined | null,
    error: Error | undefined | null,
  ) => {
    if (state.current === 'initial') {
      if (error) {
        console.error(error.name);
        pushNotification({
          severity: 'error',
          message: 'Unable to start the camera',
        });
        state.current = 'bad_device';
        return setStateStr('bad_device');
      }
      state.current = 'scanning';
      return setStateStr('scanning');
    }
    if (state.current === 'scanning') {
      const data = readData?.getText();
      if (data) {
        state.current = 'fetching';
        setStateStr('fetching');
        await Promise.all([sleep(2000), Promise.resolve()]);
        state.current = 'confirmed';
        setStateStr('confirmed');
        setTimeout(() => {
          state.current = 'scanning';
          setStateStr('scanning');
        }, throttleTime);
      }
    }
  };

  return (
    <StepLayout title="Confirm reservation">
      <Box flex={1} my={2}>
        <Container maxWidth="xs" component={Paper} elevation={2}>
          <Box display="flex" flexDirection="column" alignItems="center" py={2}>
            <Box width={250} position="relative">
              {stateStr === 'bad_device' ? (
                <ScannerPlaceholder />
              ) : (
                <QrReader
                  constraints={{ facingMode: 'user' }}
                  onResult={onResult}
                />
              )}
              <ScanOverlay state={stateStr} />
            </Box>
            <Message state={stateStr} />
          </Box>
        </Container>
      </Box>
    </StepLayout>
  );
};
