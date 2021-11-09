import { Layout } from '@/components/Layout';
import { useMobile } from '@/hooks/useMobile';
import { useOpenClose } from '@/hooks/useOpenClose';
import { Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { SeatMap, useSeats } from '../../stores/seats';
import { Content } from './Content';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';
import { ToolFAB } from './ToolFAB';

interface FloorMapProps {
  readonly initialSeats?: SeatMap;
}

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '1fr auto',
    gridTemplateAreas: `
    "toolbar  sidebar"
    "content  sidebar"
    `,
    overflow: 'hidden'
  },
});

export const FloorMap = ({initialSeats}: FloorMapProps) => {
  const classes = useStyles();
  const initialize = useSeats((s) => s.initialize)
  const [isOpen, handleOpen, handleClose] = useOpenClose();
  const isMobile = useMobile();

  useEffect(() => {
    if (initialSeats !== undefined) {
      initialize(initialSeats);
    }
  } , [initialSeats])

  return (
    <Layout>
      <div className={classes.root}>
        <Toolbar />
        <Sidebar />
        <Content />
      </div>
      <Backdrop open={isOpen} style={{ zIndex: 1}} />
      <ToolFAB open={isOpen} onOpen={handleOpen} onClose={handleClose} />
    </Layout>
  );
};
