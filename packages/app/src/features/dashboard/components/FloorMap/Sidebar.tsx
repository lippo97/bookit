import { DialogButton } from '@/components/DialogButton';
import { useMobile } from '@/hooks/useMobile';
import { useOpenClose } from '@/hooks/useOpenClose';
import {
  Box,
  Button,
  Chip,
  Grid,
  Hidden,
  IconButton,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// These two are inverted
import ExpandMoreIcon from '@material-ui/icons/ExpandLess';
import ExpandLessIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import sortBy from 'lodash/sortBy';
import { MutableRefObject, useRef, useState } from 'react';
import { useSeats } from '../../stores/seats';
import { NormalizedPropertyMap, Property } from '../../types/Property';
import { iconForProperty } from '../../utils/iconForProperty';
import { MyCheckbox } from './MyCheckbox';
import { SidebarContent } from './SidebarContent';
import { aggregate, AggregateRowResult } from './utils';

interface SidebarProps {}

const sidebarWidth = 256;

type StyleProps = {
  open: boolean;
};

const useMobileStyles = makeStyles<
  Theme,
StyleProps & { mobileHeight: () => number }
>((theme) => ({
  mobile: ({ open, mobileHeight }) => ({
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
    transformOrigin: 'top left',
    opacity: !open ? 0.5 : 1,
    translate: `0 ${!open ? (560 - 40 - theme.spacing(1.5)) : 0}px`,
    borderRadius: theme.spacing(1),
  }),
}));

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  desktop: ({ open }) => ({
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
    translate: `${open ? 0 : sidebarWidth}px`,
  }),
}));

const Mobile = () => {
  const [open, handleOpen, handleClose] = useOpenClose(false)
  const selectedIds = useSeats((s) => s.selectedIds);
  const mobileRef = useRef<HTMLDivElement | null>(null);
  const classes = useMobileStyles({
    open,
    mobileHeight: () => mobileRef.current?.getBoundingClientRect().height ?? 0,
  });

  return (
    <Paper
      square
      elevation={3}
      className={clsx(classes.mobile)}
      ref={mobileRef}
    >
      <Box display="flex" alignItems="center" justifyContent="center" height={40}>
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
  const selectedIds = useSeats((s) => s.selectedIds);
  const classes = useStyles({
    open: selectedIds.length > 0,
  });

  if (isMobile) {
    return <Mobile />;
  }

  return (
    <Paper square elevation={3} className={clsx(classes.desktop)}>
      <SidebarContent />
    </Paper>
  );
};
