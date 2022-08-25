/* eslint-disable consistent-return */
import { useMobile } from '@/hooks/useMobile';
import * as V2 from '@asw-project/shared/util/vector';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  forwardRef,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import usePanZoom from 'use-pan-and-zoom';
import { useEditor } from '../../stores/editor';
import { useSeats } from '../../stores/seats';
import { boxSize } from './constants';
import { Hover } from './Hover';
import { Seat } from './Seat';

const gridColor = '#ddd';

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

const MyHandle = forwardRef<HTMLDivElement>((props, ref) => (
  <div
    ref={ref}
    className={clsx('react-resizable-handle', 'react-resizable-handle-se')}
    {...props}
  />
));

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
  const isMobile = useMobile();

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
    return V2.div(point, boxSize * 1.0 * scale).map(
      Math.floor,
    ) as unknown as V2.Vector2;
  };

  const handleBackgroundClick: MouseEventHandler<HTMLElement> = (e) => {
    if (selectedTool === 'select') {
      return clearSelection();
    }
  };

  const handleClick: MouseEventHandler<HTMLElement> = (e) => {
    const { useNextSeatId } = useSeats.getState();
    if (selectedTool === 'add') {
      const position = scaleClick(e);
      if (position === undefined) return;
      useNextSeatId((label) =>
        Promise.resolve(
          addSeat(label, {
            position,
            previouslyExisting: false,
            label,
          }),
        ),
      );
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

  const {
    transform,
    setContainer,
    panZoomHandlers,
    zoom,
    setPan,
    setZoom,
    container,
  } = usePanZoom({
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
    const ratio = width / (size[0] * boxSize);
    if (isMobile) {
      setZoom(ratio / 1.1);
    } else {
      setPan({ x, y });
    }
  }, [container, isMobile]);

  return (
    <div
      className={classes.content}
      ref={(el) => setContainer(el)}
      style={{ touchAction: 'none' }}
      {...panZoomHandlers}
      onClick={handleBackgroundClick}
    >
      <div
        style={{
          transform,
          transformOrigin: 'top left',
          width: size[0] * boxSize,
        }}
      >
        <span
          style={{
            color: 'rgba(0,0,0,0.87)',
            fontSize: 12,
            userSelect: 'none',
          }}
        >
          Room name ({size[0]} × {size[1]}){' - '}
          <a
            onClick={() => console.log('click')}
            style={{
              color: 'rgb(34, 88, 106)',
              cursor: 'pointer',
            }}
          >
            Change size
          </a>
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
          handle={selectedTool === 'select' ? <MyHandle /> : <></>}
        >
          <Box
            position="relative"
            width={size[0] * boxSize}
            height={size[1] * boxSize + 1}
            bgcolor="#ffffff"
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            }}
          >
            <div
              ref={boxRef}
              style={{
                height: '100%',
                backgroundSize: '50px 50px',
                backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px),  linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
                backgroundRepeat: 'repeat',
                margin: '-1px 0 0 -1px',
                borderBottom: `1px solid ${gridColor}`,
              }}
            />
            {seatIds.map((id) => (
              <Seat id={id} key={id} />
            ))}
            {hover && !isMobile && <Hover position={hover} />}
          </Box>
        </Resizable>
      </div>
    </div>
  );
};
