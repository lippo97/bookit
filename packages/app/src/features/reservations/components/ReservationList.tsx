import { WithId } from '@asw-project/shared/data/withId';
import { Reservation } from '@asw-project/shared/generatedTypes';
import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { FC } from 'react';
import { ReservationListItem } from './ReservationListItem';

interface ReservationListProps {
  readonly status: 'success' | 'error' | 'idle' | 'loading';
  readonly data?: Array<WithId<Reservation>>;
}

const Error: FC = () => (
  <>
    <Typography variant="h5">Error 404</Typography>
    <Typography variant="h6">
      Couldn&apos;t find the content you&apos;re looking for.
    </Typography>
  </>
);

const Empty: FC = () => (
  <Typography variant="body1">There is no reservation.</Typography>
);

export const ReservationList: FC<ReservationListProps> = ({ data, status }) => {
  if (status === 'error') {
    return <Error />;
  }
  if (status === 'idle' || status === 'loading') {
    return (
      <>
        <Skeleton variant="rect" height={132} />
        <Skeleton variant="rect" height={132} style={{ marginTop: '16px' }} />
        <Skeleton variant="rect" height={132} style={{ marginTop: '16px' }} />
      </>
    );
  }
  if (data!.length === 0) {
    return <Empty />;
  }
  return (
    <>
      {data!.map((r) => (
        <ReservationListItem key={r._id} data={r} />
      ))}
    </>
  );
};
