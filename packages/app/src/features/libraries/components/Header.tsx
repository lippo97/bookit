import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Searchbar from '@/components/Searchbar';

interface HeaderProps {
  readonly previousQuery?: string;
  openFilterDialog(): void;
  onSearch(query: String): void;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
    margin: theme.spacing(3, 0),
  },
  bar: {
    padding: 10,
  },
}));

export function LibraryHeader({
  onSearch,
  previousQuery,
  openFilterDialog,
}: HeaderProps) {
  const classes = useStyles();
  return (
    // <Paper elevation={1} className={classes.paper}>
    <Searchbar
      defaultValue={previousQuery || ''}
      onSearch={onSearch}
      onFilter={openFilterDialog}
      placeholder="Look for a library"
    />
    // </Paper>
  );
}
