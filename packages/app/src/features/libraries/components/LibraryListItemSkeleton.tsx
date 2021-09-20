import { Card, CardContent, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

export const LibraryListItemSkeleton = () => (
  <Card>
    <Skeleton variant="rect" height={140} />
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        <Skeleton />
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        <Skeleton />
      </Typography>
    </CardContent>
  </Card>
);
