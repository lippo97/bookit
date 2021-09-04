import { Building as TBuilding } from '@asw-project/shared/generatedTypes';
import { WithId } from '@asw-project/shared/data/withId';
import { Grid, CircularProgress } from '@material-ui/core';
import { LibraryListItem } from './LibraryListItem';

interface BuildingListProps {
  readonly isLoading?: boolean;
  readonly places: WithId<TBuilding>[];
}

export function LibraryList({ isLoading, places }: BuildingListProps) {
  if (isLoading === true) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (places.length === 0) {
    return <div>There&apos; nothing to display.</div>;
  }

  return (
    <div>
      <Grid container spacing={5}>
        {places.map((p) => (
          <Grid item xs={12} sm={6} lg={4}>
            <LibraryListItem data={p} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
