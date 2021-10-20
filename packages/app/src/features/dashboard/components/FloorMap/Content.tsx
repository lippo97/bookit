import useRect from '@/hooks/useRect';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useRef } from 'react';
import { useEditor } from '../../stores/editor';
import { useSeats } from '../../stores/seats';
import { Seat } from './Seat';
import { boxSize } from './constants';

interface ContentProps {}

const useStyles = makeStyles((theme) => ({
  content: {
    gridArea: 'content',
    background: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

  const seatIds = useSeats((s) => s.seatIds);
  const clearSelection = useSeats((s) => s.clearSelection);
  const setSize = useSeats(s => s.setSize);
  const size = useEditor((s) => s.size);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {setSize([10, 5])}, [setSize]);

  return (
    <div className={classes.content} ref={boxRef}>
      <Box
        position="relative"
        width={size[0] * boxSize}
        height={size[1] * boxSize}
        bgcolor="#fafae2"
        onClick={clearSelection}
      >
        {seatIds.map((id) => (
          <Seat id={id} key={id} />
        ))}
      </Box>
    </div>
  );
};
