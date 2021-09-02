import {
  AppBar as MuiAppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircleOutlined';
import MenuIcon from '@material-ui/icons/MenuOutlined';
import { useAtom } from 'jotai';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { authentication } from '../state/authentication';

export interface AppBarProps {
  readonly title?: string;

  onMenuOpen(): void;
}

const useStyles = makeStyles((theme) => ({
  menuButton: {
    color: 'inherit',
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  iconButton: {
    color: 'inherit',
  },
  button: {
    color: 'inherit',
    textDecoration: 'none',
  },
}));

function UserButton() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick} className={classes.iconButton}>
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem component={RouterLink} to="/logout" onClick={handleClose}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

function AppBar({ title, onMenuOpen }: AppBarProps) {
  const [auth] = useAtom(authentication);
  const classes = useStyles();

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <IconButton
          onClick={onMenuOpen}
          edge="start"
          color="inherit"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        {title && (
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        )}
        {auth ? (
          <UserButton />
        ) : (
          <Button component={RouterLink} to="/login" className={classes.button}>
            Login
          </Button>
        )}
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
