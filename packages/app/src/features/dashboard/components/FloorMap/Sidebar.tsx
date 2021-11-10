import { useMobile } from '@/hooks/useMobile';
import { useOpenClose } from '@/hooks/useOpenClose';
import { Box, IconButton, Paper, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// These two are inverted
import ExpandMoreIcon from '@material-ui/icons/ExpandLess';
import ExpandLessIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useSeats } from '../../stores/seats';
import { SidebarContent } from './SidebarContent';

interface SidebarProps {}

const sidebarWidth = 256;

type StyleProps = {
  open: boolean;
};

const useMobileStyles = makeStyles((theme) => ({
  mobile: {
    position: 'absolute',
    transition: 'translate 0.3s, opacity 0.3s',
    left: 0,
    bottom: 0,
    right: 0,
    padding: theme.spacing(1.5),
    zIndex: theme.zIndex.drawer,
    '& > *': {
      marginBottom: theme.spacing(2),
    },
    width: '100%',
    height: '560px',
    translate: `0 ${560 - 40 - theme.spacing(1.5)}px`,
    transformOrigin: 'top left',
    borderRadius: theme.spacing(1),
    opacity: 0.5,
  },
  mobileOpen: {
    translate: '0 0',
    opacity: 1,
    zIndex: 1400,
  },
}));

const useStyles = makeStyles((theme) => ({
  desktop: {
    position: 'absolute',
    transition: 'translate 0.3s',
    padding: theme.spacing(1.5),
    zIndex: theme.zIndex.drawer,
    '& > *': {
      marginBottom: theme.spacing(2),
    },
    width: `${sidebarWidth}px`,
    height: '100%',
    top: 0,
    bottom: 0,
    right: 0,
    translate: `${sidebarWidth}px`,
  },
  desktopOpen: {
    translate: '0',
  },
}));

const Mobile = () => {
  const [open, handleOpen, handleClose] = useOpenClose(false);
  const selectedIds = useSeats((s) => s.selectedIds);
  const classes = useMobileStyles();

  // If you clear the selection while the sidebar is open, this will close it.
  useEffect(() => {
    if (open && selectedIds.length === 0) {
      handleClose();
    }
  }, [open, selectedIds]);

  return (
    <Paper
      square
      elevation={3}
      className={clsx(classes.mobile, { [classes.mobileOpen]: open })}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={40}
      >
        {open ? (
          <IconButton onClick={handleClose}>
            <ExpandLessIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleOpen} disabled={selectedIds.length === 0}>
            <ExpandMoreIcon />
          </IconButton>
        )}
      </Box>
      <SidebarContent />
    </Paper>
  );
};

export const Sidebar = () => {
  const isMobile = useMobile();
  const selectedIdsLength = useSeats((s) => s.selectedIds.length);
  const classes = useStyles();

  if (isMobile) {
    return <Mobile />;
  }

  const open = selectedIdsLength > 0;
  return (
    <Paper
      square
      elevation={3}
      className={clsx(classes.desktop, { [classes.desktopOpen]: open })}
    >
      <SidebarContent />
    </Paper>
  );
};
