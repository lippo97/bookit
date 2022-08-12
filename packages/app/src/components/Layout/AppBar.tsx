import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/MenuOutlined';

export interface AppBarProps {
  noDrawer?: true;
  extendedAppBar?: true;
  transparentAppBar?: true;
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
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    userSelect: 'none',
  },
  appBar: {
    boxShadow: (p) => (p.extendedAppBar || p.transparentAppBar) && 'none',
    borderBottom: 'red',
    background: (p) =>
      p.transparentAppBar && 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0))',
    position: (p) => p.transparentAppBar && 'absolute',
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
        <Box flex={1}>
          <Typography
            variant="h6"
            className={classes.title}
            component={RouterLink}
            to="/"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            bookit
          </Typography>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}
