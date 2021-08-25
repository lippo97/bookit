import {
  AppBar as MuiAppBar,
  Menu,
  Button,
  IconButton,
  Toolbar,
  Typography,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/MenuOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircleOutlined';
import { authentication, Authentication } from '../state/authentication';
import React from 'react';
import { useAtom } from 'jotai';

export interface AppBarProps {
  readonly title: string;

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
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>

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
