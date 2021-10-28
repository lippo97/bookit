import * as V2 from '@asw-project/shared/util/vector';
import { Vector2 } from '@asw-project/shared/util/vector';
import { makeStyles } from '@material-ui/core';
import shadows from '@material-ui/core/styles/shadows';
import { DraggableCore, DraggableEvent } from 'react-draggable';
import { Tool, useEditor } from '../../stores/editor';
import { useSeats } from '../../stores/seats';
import { boxSize } from './constants';

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
    moving,
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
    left: `${scaledPosition[0] -1 }px`,
    background: moving ? '#ffffffaa' : '#ffffff',
    border: selected ? '2px dotted #111' : '1px solid #999',
    zIndex: selected ? 1 : 0,
    cursor: caseCursor(selected, selectedTool),
  }),
});

export const Seat = ({ id }: SeatProps) => {
  const selectedTool = useEditor((s) => s.selectedTool);
  const scale = useEditor((s) => s.scale);
  const { moving, position, selected } = useSeats((s) => s.seatById[id]);
  const replaceSelection = useSeats((s) => s.replaceSelection);
  const updateSelection = useSeats((s) => s.updateSelection);
  const removeSeat = useSeats((s) => s.removeSeat);
  const startMoving = useSeats((s) => s.startMoving);
  const stopMoving = useSeats((s) => s.stopMoving);
  const move = useSeats((s) => s.move);

  const scaledPosition = V2.mul(position, boxSize);
  const classes = useStyles({ moving, scaledPosition, selected, selectedTool });

  /*
   * Unfortunately down below it's gonna be a mess of FSM logic.
   */
  const draggableProps =
    selectedTool === 'select'
      ? {
          onStart: (e: DraggableEvent) => {
            if (!selected) {
              if (e.ctrlKey) {
                updateSelection(id);
              } else {
                replaceSelection(id);
              }
            }
            startMoving();
          },
          onStop: () => stopMoving(),
          onDrag: (
            _: any,
            { deltaX, deltaY }: { deltaX: number; deltaY: number },
          ) => {
            const delta = V2.div([deltaX, deltaY], boxSize);
            move(delta);
          },
        }
      : {};

  return (
    <DraggableCore grid={[boxSize, boxSize]} scale={scale} {...draggableProps}>
      <div
        className={classes.box}
        onClick={(e) => {
          e.stopPropagation();
          if (selectedTool === 'remove') {
            removeSeat(id);
          }
        }}
      >
        {id}
      </div>
    </DraggableCore>
  );
};
