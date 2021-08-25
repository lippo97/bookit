import { Paper, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Searchbar from './Searchbar';

interface HeaderProps {}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
    margin: theme.spacing(3, 0),
  },
  bar: {
    padding: 10,
  },
}));

function Header({}: HeaderProps) {
  const classes = useStyles();
  return (
    <Paper elevation={1} className={classes.paper}>
      <Searchbar onSearch={(query) => console.log(query)} />
    </Paper>
  );
}

export default Header;
