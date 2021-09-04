import {
  AppBar as MuiAppBar,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/MenuOutlined';
import React from 'react';

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
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    userSelect: 'none',
  },
  iconButton: {
    color: 'inherit',
  },
  button: {
    color: 'inherit',
    textDecoration: 'none',
  },
}));

export function AppBar({ title, onMenuOpen }: AppBarProps) {
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
          bookit
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}
