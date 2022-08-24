import { StepLayout } from '@/components/StepLayout';
import { useNotification } from '@/stores/notifications';
import { Box, Container, Paper, Typography } from '@material-ui/core';
import CameraIcon from '@material-ui/icons/Camera';
import CropFreeIcon from '@material-ui/icons/CropFree';
import { HTTPError } from 'ky';
import { FC, useRef, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useMutation } from 'react-query';
import { confirmReservation } from '../api/reservations';

type State =
  | 'initial'
  | 'bad_device'
  | 'scanning'
  | 'fetching'
  | 'confirmed'
  | 'already_confirmed'
  | 'rejected';

const throttleTime = 3 * 1000;

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
  const baseStyle = {
    position: 'absolute',
    width: 200,
    height: 200,
    top: 25,
    left: 25,
  } as const;
  /* eslint-disable no-nested-ternary */
  const color =
    state === 'scanning'
      ? '#000000aa'
      : state === 'rejected'
      ? '#75020278'
      : state === 'fetching'
      ? '#00000044'
      : state === 'confirmed'
      ? '#00600f78'
      : '#00000000';
  /* eslint-enable no-nested-ternary */
  return <CropFreeIcon style={{ ...baseStyle, color }} />;
};

const Message: FC<{ state: State }> = ({ state }) => {
  const caseOf = (state: State) => {
    switch (state) {
      case 'already_confirmed':
        return 'Reservation was already confirmed.';
      case 'bad_device':
        return 'Unable to access the camera. Check your permissions.';
      case 'confirmed':
        return 'Reservation confirmed successfully!';
      case 'fetching':
        return 'Checking validity...';
      case 'rejected':
        return 'Unable to confirm reservation. Retry later.';
      case 'scanning':
        return 'Frame the QR code into the camera.';
      default:
        return '';
    }
  };
  return <Typography variant="body1">{caseOf(state)}</Typography>;
};

export const ConfirmReservation: FC = () => {
  const state = useRef<State>('initial');
  const [stateStr, setStateStr] = useState<State>(state.current);
  const setState = (updated: State) => {
    state.current = updated;
    setStateStr(updated);
  };
  const { pushNotification } = useNotification();
  const { mutateAsync } = useMutation<void, string, string>(
    'reservation/confirm',
    confirmReservation,
  );

  const sleep = (timer: number) =>
    new Promise((resolve) => setTimeout(resolve, timer));

  const checkPermissions = (error: Error | undefined | null): void => {
    if (state.current === 'initial') {
      if (
        error?.name === 'NotAllowedError' ||
        error?.name === 'NotFoundError'
      ) {
        pushNotification({
          severity: 'error',
          message: 'Unable to start the camera',
        });
        return setState('bad_device');
      }
      return setState('scanning');
    }
  };

  const onResult = async (
    readData: { getText(): string } | undefined | null,
    error: Error | undefined | null,
  ): Promise<void> => {
    checkPermissions(error);
    if (state.current === 'scanning') {
      const data = readData?.getText();
      if (data) {
        setState('fetching');
        try {
          await Promise.all([sleep(1000), mutateAsync(data)]);
          setState('confirmed');
          pushNotification({
            message: 'Reservation confirmed successfully.',
            severity: 'success',
          });
        } catch (err) {
          if (err instanceof HTTPError && err.response.status === 400) {
            setState('already_confirmed');
            pushNotification({
              message: 'Reservation was already confirmed.',
              severity: 'warning',
            });
          } else {
            pushNotification({
              message: 'Unable to confirm reservation. Retry later.',
              severity: 'error',
            });
          }
        } finally {
          setTimeout(() => {
            setState('scanning');
          }, throttleTime);
        }
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
