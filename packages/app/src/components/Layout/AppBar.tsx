import {
  AppBar as MuiAppBar,
  IconButton,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/MenuOutlined';

export interface AppBarProps {
  noDrawer?: true;
  extendedAppBar?: true;
  onMenuOpen(): void;
}

const useStyles = makeStyles<
  Theme,
  AppBarProps,
  'menuButton' | 'title' | 'appBar'
>((theme) => ({
  menuButton: {
    color: 'inherit',
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    userSelect: 'none',
  },
  appBar: {
    boxShadow: (p) => p.extendedAppBar && 'none',
    borderBottom: 'red',
  },
}));

export function AppBar(props: AppBarProps) {
  const { noDrawer, onMenuOpen } = props;
  const classes = useStyles(props);

  return (
    <MuiAppBar position="static" className={classes.appBar}>
      <Toolbar>
        {!noDrawer && (
          <IconButton
            onClick={onMenuOpen}
            edge="start"
            color="inherit"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" className={classes.title}>
          bookit
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}
