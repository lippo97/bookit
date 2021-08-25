import { Toolbar as MuiToolbar, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ToolbarContent from './ToolbarContent';

const useStyles = makeStyles((theme) => ({
  toolbarWrapper: {
    color: '#fff',
    background: theme.palette.primary.main,
    gridArea: 'toolbar',
    zIndex: theme.zIndex.appBar,
  },
  toolbarPaper: {
    color: 'inherit',
    background: 'inherit',
  },
  toolbar: {},
}));

function Toolbar() {
  const classes = useStyles();
  return (
    <header className={classes.toolbarWrapper}>
      <Paper elevation={6} square className={classes.toolbarPaper}>
        <MuiToolbar className={classes.toolbar}>
          <ToolbarContent />
        </MuiToolbar>
      </Paper>
    </header>
  );
}

export default Toolbar;
