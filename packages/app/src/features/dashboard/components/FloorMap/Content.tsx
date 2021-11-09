/* eslint-disable consistent-return */
import * as V2 from '@asw-project/shared/util/vector';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
  forwardRef,
} from 'react';
import usePanZoom from 'use-pan-and-zoom';
import { Resizable } from 'react-resizable';
import { useEditor } from '../../stores/editor';
import { useSeats } from '../../stores/seats';
import { boxSize } from './constants';
import { Hover } from './Hover';
import { Seat } from './Seat';
import clsx from 'clsx';
import 'react-resizable/css/styles.css';

const useStyles = makeStyles((theme) => ({
  content: {
    gridArea: 'content',
    background: theme.palette.background.default,
    overflow: 'hidden',
  },
  canvas: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const MyHandle = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('react-resizable-handle', 'react-resizable-handle-se')}
      {...props}
    />
  );
});

export const Content = () => {
  const classes = useStyles();

  const scale = useEditor((s) => s.scale);
  const setScale = useEditor((s) => s.setScale);
  const selectedTool = useEditor((s) => s.selectedTool);
  const seatIds = useSeats((s) => s.seatIds);
  const addSeat = useSeats((s) => s.addSeat);
  const clearSelection = useSeats((s) => s.clearSelection);
  const setSize = useSeats((s) => s.setSize);
  const size = useSeats((s) => s.size);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const [counter, setCounter] = useState<number>(0);
  const [hover, setHover] = useState<V2.Vector2 | null>(null);

  useEffect(() => {
    setSize([10, 5]);
  }, [setSize]);

  const scaleClick = ({
    clientX,
    clientY,
  }: Pick<MouseEvent<HTMLElement, MouseEvent>, 'clientX' | 'clientY'>) => {
    const rect = boxRef.current?.getBoundingClientRect();
    if (rect === undefined) return undefined;
    const { top, left } = rect;
    const point = V2.sub([clientX, clientY], [left, top]);
    return V2.div(point, boxSize * 1.01 * scale).map(
      Math.floor,
    ) as unknown as V2.Vector2;
  };

  const handleClick: MouseEventHandler<HTMLElement> = (e) => {
    if (selectedTool === 'select') {
      return clearSelection();
    }
    if (selectedTool === 'add') {
      const position = scaleClick(e);
      if (position === undefined) return;
      if (addSeat(counter.toString(), { position })) {
        setCounter((c) => c + 1);
      }
    }
  };

  const handleMouseMove: MouseEventHandler<HTMLElement> | undefined =
    selectedTool === 'add'
      ? ({ clientX, clientY }) => {
          const position = scaleClick({ clientX, clientY });
          if (position === undefined) return;
          setHover(position);
        }
      : undefined;

  const handleMouseLeave: MouseEventHandler<HTMLElement> = () => setHover(null);

  const { transform, setContainer, panZoomHandlers, zoom, setPan, container } =
    usePanZoom({
      enableZoom: selectedTool === 'select',
      enablePan: selectedTool === 'select',
      zoomSensitivity: 0.002,
      requireCtrlToZoom: true,
      preventClickOnPan: true,
    });

  useEffect(() => {
    setScale(zoom);
  }, [zoom]);

  useEffect(() => {
    if (container === null) return;
    const { width, height } = container.getBoundingClientRect();
    const x = (width - size[0] * boxSize) / 2;
    const y = (height - size[1] * boxSize) / 2;
    setPan({ x, y });
  }, [container]);

  return (
    <div
      className={classes.content}
      ref={(el) => setContainer(el)}
      style={{ touchAction: 'none' }}
      {...panZoomHandlers}
    >
      <div
        style={{
          transform,
          transformOrigin: 'top left',
          width: size[0] * boxSize,
        }}
      >
        <span style={{ color: 'rgba(0,0,0,0.87)', fontSize: 12 }}>
          Room name ({size[0]} × {size[1]})
        </span>
        <Resizable
          height={size[1] * boxSize + 1}
          width={size[0] * boxSize}
          onResize={(e, { size: { width, height } }) => {
            const updated = V2.div([width, height - 1] as V2.Vector2, boxSize);
            setSize(updated);
            e.stopPropagation();
          }}
          onResizeStart={(e) => {
            e.stopPropagation();
          }}
          onResizeStop={(e) => {
            e.stopPropagation();
          }}
          draggableOpts={{ grid: [50, 50], scale }}
          handle={<MyHandle />}
        >
          <Box
            position="relative"
            width={size[0] * boxSize}
            height={size[1] * boxSize + 1}
            bgcolor="#fafae2"
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={boxRef}
              style={{
                height: '100%',
                backgroundSize: '50px 50px',
                backgroundImage:
                  'linear-gradient(to right, grey 1px, transparent 1px),  linear-gradient(to bottom, grey 1px, transparent 1px)',
                backgroundRepeat: 'repeat',
                margin: '-1px 0 0 -1px',
                borderBottom: '1px solid grey',
              }}
            />
            {seatIds.map((id) => (
              <Seat id={id} key={id} />
            ))}
            {hover && <Hover position={hover} />}
          </Box>
        </Resizable>
      </div>
    </div>
  );
};
