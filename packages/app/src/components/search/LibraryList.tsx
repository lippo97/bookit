import { Library as TLibrary } from '@asw-project/shared/generatedTypes';
import { WithId } from '@asw-project/shared/data/withId';
import { Grid, CircularProgress, Typography, Box } from '@material-ui/core';
import Library from './Library';

interface LibraryListProps {
  readonly isLoading?: boolean;
  readonly places: WithId<TLibrary>[];
}

function LibraryList({ isLoading, places }: LibraryListProps) {
  if (isLoading === true) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (places.length === 0) {
    return <div>There's nothing to display.</div>;
  }

  return (
    <>
      <Box my={2}>
        <Typography variant="h5">Favorite Libraries</Typography>
      </Box>
      <Grid container spacing={2}>
        {places.map((p) => (
          <Grid item key={p._id} xs={12} sm={6} lg={4}>
            <Library data={p} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default LibraryList;
