import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Searchbar from '@/components/Searchbar';

interface HeaderProps {
  readonly previousQuery?: string;
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

export function LibraryHeader({ onSearch, previousQuery }: HeaderProps) {
  const classes = useStyles();
  return (
    <Paper elevation={1} className={classes.paper}>
      <Searchbar
        defaultValue={previousQuery || ''}
        onSearch={onSearch}
        placeholder="Look for a library"
      />
    </Paper>
  );
}
