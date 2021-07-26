import { Toolbar as MuiToolbar, makeStyles, Paper } from '@material-ui/core';
import FullVertical from '../FullVertical';
import ToolbarContent from './ToolbarContent';
interface EditorProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    height: '100%',
    gridTemplateRows: 'auto 1fr',
    gridTemplateAreas: `
    "toolbar toolbar"
    "main    main"
    `,
  },
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
  main: {
    gridArea: 'main',
    background: theme.palette.background.paper,
    overflow: 'scroll',
  },
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

function Main() {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <div
        style={{
          width: 1300,
          height: 700,
          background: 'red',
        }}
      >
        <Paper elevation={3}>
          <div>content</div>
          <div>content</div>
          <div>content</div>
        </Paper>
      </div>
    </div>
  );
}

function Editor({}: EditorProps) {
  const classes = useStyles();
  return (
    <FullVertical>
      <div className={classes.root}>
        <Toolbar />
        <Main />
      </div>
    </FullVertical>
  );
}

export default Editor;
