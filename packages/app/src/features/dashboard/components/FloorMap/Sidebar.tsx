import { useMobile } from '@/hooks/useMobile';
import { useOpenClose } from '@/hooks/useOpenClose';
import { Box, IconButton, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// These two are inverted
import ExpandMoreIcon from '@material-ui/icons/ExpandLess';
import ExpandLessIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useSeats } from '../../stores/seats';
import { SidebarContent } from './SidebarContent';

const sidebarWidth = 256;

const useMobileStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  containerOpen: {
    top: 0,
    height: '100%',
    zIndex: 1400,
    overflowY: 'scroll',
  },
  mobile: {
    transition: 'translate 0.3s, opacity 0.3s, height 0.3s',
    padding: theme.spacing(1.5),
    '& > *': {
      marginBottom: theme.spacing(2),
    },
    height: '560px',
    translate: `0 ${560 - 40 - theme.spacing(1.5)}px`,
    transformOrigin: 'top left',
    borderRadius: theme.spacing(1),
    opacity: 0.3,
  },
  mobileOpen: {
    translate: '0 0',
    opacity: 1,
    height: 'auto',
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
    <div className={clsx(classes.container, {[classes.containerOpen]: open})}>
        <Box flex={1} />
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
            <IconButton
              onClick={handleOpen}
              disabled={selectedIds.length === 0}
            >
              <ExpandMoreIcon />
            </IconButton>
          )}
        </Box>
        <SidebarContent />
      </Paper>
    </div>
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
