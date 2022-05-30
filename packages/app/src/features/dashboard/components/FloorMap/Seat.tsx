import { useMobile } from '@/hooks/useMobile';
import { Service } from '@asw-project/shared/generatedTypes';
import * as V2 from '@asw-project/shared/util/vector';
import { Vector2 } from '@asw-project/shared/util/vector';
import { Box, makeStyles } from '@material-ui/core';
import { SettingsInputComponentOutlined } from '@material-ui/icons';
import clsx from 'clsx';
import { useState } from 'react';
import { DraggableCore, DraggableEvent } from 'react-draggable';
import { Tool, useEditor } from '../../stores/editor';
import { useSeats } from '../../stores/seats';
import { iconForService } from '../../utils/iconForProperty';
import { boxSize } from './constants';

// eslint-disable-next-line consistent-return

export const iconForServiceCurried =
  (style: Parameters<typeof iconForService>[1]) =>
  (property: Parameters<typeof iconForService>[0]) =>
    iconForService(property, style);

interface SeatProps {
  readonly id: string;
}

const caseCursor = (selected: boolean, selectedTool: Tool) => {
  if (selectedTool === 'remove') return 'pointer';
  if (selectedTool === 'select' && selected) return 'move';
  return 'pointer';
};

const useStyles = makeStyles({
  box: ({
    scaledPosition,
    selected,
    selectedTool,
  }: {
    scaledPosition: Vector2;
    moving: boolean;
    selected: boolean;
    selectedTool: Tool;
  }) => ({
    position: 'absolute',
    width: `${boxSize + 1}px`,
    height: `${boxSize + 1}px`,
    top: `${scaledPosition[1]}px`,
    left: `${scaledPosition[0] - 1}px`,
    background: 'rgb(235, 247, 251)',
    border: selected ? '2px dotted #555' : '1px solid rgb(156, 190, 202)',
    zIndex: selected ? 1 : 0,
    cursor: caseCursor(selected, selectedTool),
  }),
});

export const Seat = ({ id }: SeatProps) => {
  const selectedTool = useEditor((s) => s.selectedTool);
  const scale = useEditor((s) => s.scale);
  const { moving, position, selected, services } = useSeats(
    (s) => s.seatById[id],
  );
  const replaceSelection = useSeats((s) => s.replaceSelection);
  const updateSelection = useSeats((s) => s.updateSelection);
  const removeSeat = useSeats((s) => s.removeSeat);
  const startMoving = useSeats((s) => s.startMoving);
  const stopMoving = useSeats((s) => s.stopMoving);
  const move = useSeats((s) => s.move);

  const scaledPosition = V2.mul(position, boxSize);
  const classes = useStyles({ moving, scaledPosition, selected, selectedTool });

  const isMobile = useMobile();
  const [wasMoved, setWasMoved] = useState(false);

  /*
   * Unfortunately down below it's gonna be a mess of FSM logic.
   */
  const draggableProps =
    selectedTool === 'select'
      ? {
          onStart: (e: DraggableEvent) => {
            e.stopPropagation();
            updateSelection(id);
            startMoving();
          },
          onStop: (e: DraggableEvent) => {
            e.stopPropagation();
            if (!wasMoved) {
              if (e.ctrlKey || isMobile) {
                updateSelection(id);
              } else {
                replaceSelection(id);
              }
            }
            setWasMoved(false);
            stopMoving();
          },
          onDrag: (
            e: DraggableEvent,
            { deltaX, deltaY }: { deltaX: number; deltaY: number },
          ) => {
            e.stopPropagation();
            if (!selected) {
              // This prevents a selection bug
              console.log('select me', id);
              updateSelection(id);
            }
            const delta = V2.div([deltaX, deltaY], boxSize);
            move(delta, id);
            setWasMoved(true);
          },
        }
      : {};

  return (
    <DraggableCore grid={[boxSize, boxSize]} scale={scale} {...draggableProps}>
      <div
        className={clsx(classes.box, 'box')}
        onClick={(e) => {
          e.stopPropagation();
          if (selectedTool === 'remove') {
            // graphic remove
            removeSeat(id);
          }
        }}
      >
        <Box display="flex" flexDirection="column" height="100%" p="1px">
          <span style={{ fontWeight: 'bold' }}>{id}</span>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="flex-end"
            alignItems="flex-end"
            flex={1}
          >
            {Object.entries(services)
              .filter(([_, v]) => v)
              .map(([k]) => k as Service)
              .map(
                iconForServiceCurried({
                  height: 12,
                  width: 12,
                  marginLeft: 2,
                }),
              )}
          </Box>
        </Box>
      </div>
    </DraggableCore>
  );
};
