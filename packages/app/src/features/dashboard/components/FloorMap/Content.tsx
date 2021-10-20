import useRect from '@/hooks/useRect';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRef } from 'react';
import { useEditor } from '../../stores/editor';
import { useSeats } from '../../stores/seats';
import { Seat } from './Seat';
import { boxSize } from './constants';

interface ContentProps {
}

const useStyles = makeStyles((theme) => ({
  content: {
    gridArea: 'content',
    background: theme.palette.background.default,
    // overflow: 'hidden',
  },
  canvas: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const Content = () => {
  const classes = useStyles();

  const seatIds = useSeats(s => s.seatIds)
  const size = useEditor(s => s.size)
  const boxRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={classes.content} ref={boxRef}>
      <Box position="relative" width={size[0] * boxSize} height={size[1] * boxSize} bgcolor="#fafae2">
        {seatIds.map(id => <Seat id={id} />)}
      </Box>
    </div>
  );
};
