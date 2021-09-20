import { Library as TLibrary } from '@asw-project/shared/generatedTypes';
import { WithId } from '@asw-project/shared/data/withId';
import { Grid } from '@material-ui/core';
import { LibraryListItem } from './LibraryListItem';
import { LibraryListItemSkeleton } from './LibraryListItemSkeleton';

interface LibraryListProps {
  readonly isLoading?: boolean;
  readonly places: WithId<TLibrary>[];
}

export function LibraryList({ isLoading, places }: LibraryListProps) {
  const MyGrid = ({ children }: { children: React.ReactNode }) => (
    <Grid container spacing={5}>
      {children}
    </Grid>
  );

  const MyItem = ({ children }: { children: React.ReactNode }) => (
    <Grid item xs={12} sm={6} lg={4}>
      {children}
    </Grid>
  );

  if (isLoading === true) {
    return (
      <MyGrid>
        <MyItem>
          <LibraryListItemSkeleton />
        </MyItem>
        <MyItem>
          <LibraryListItemSkeleton />
        </MyItem>
        <MyItem>
          <LibraryListItemSkeleton />
        </MyItem>
      </MyGrid>
    );
  }

  if (places.length === 0) {
    return <div>There&apos; nothing to display.</div>;
  }

  return (
    <MyGrid>
      {places.map((p) => (
        <MyItem>
          <LibraryListItem data={p} />
        </MyItem>
      ))}
    </MyGrid>
  );
}
