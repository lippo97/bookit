import { WithId } from '@asw-project/shared/data/withId';
import { Reservation } from '@asw-project/shared/generatedTypes';
import { Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import QRCode from 'react-qr-code';

interface QRProps {
  readonly reservation?: WithId<Reservation>;
  readonly status: 'success' | 'error' | 'idle' | 'loading';
}

export const QR: React.FC<QRProps> = ({ reservation, status }) => {
  const Content: React.FC = () => {
    if (status === 'loading') {
      return <Skeleton variant="rect" width="256" height="256" />;
    }
    if (status === 'error') {
      return <></>;
    }
    return <QRCode value={reservation!._id} />;
  };

  return (
    <Box display="flex" justifyContent="center">
      <Content />
    </Box>
  );
};
