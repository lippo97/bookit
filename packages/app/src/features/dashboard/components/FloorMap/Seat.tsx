import * as V2 from '@asw-project/shared/util/vector';
import { Vector2 } from '@asw-project/shared/util/vector';
import { makeStyles } from '@material-ui/core';
import { DraggableCore } from 'react-draggable';
import { useSeats } from '../../stores/seats';
import { boxSize } from './constants';

interface SeatProps {
  readonly id: string;
}

const useStyles = makeStyles({
  box: ({
    scaledPosition,
    moving,
    selected,
  }: {
    scaledPosition: Vector2;
    moving: boolean;
    selected: boolean;
  }) => ({
    position: 'absolute',
    width: `${boxSize+1}px`,
    height: `${boxSize+1}px`,
    top: `${scaledPosition[1]}px`,
    left: `${scaledPosition[0]}px`,
    background: moving ? '#ffffffaa' : '#ffffff',
    display: 'inline-block',
    marginLeft: '-1px',
    marginBottom: '-1px',
    border: selected ? '2px dotted #111' : '1px solid #999',
    zIndex: selected ? 1 : 0,
  }),
});

export const Seat = ({ id }: SeatProps) => {
  const {moving, position, selected} = useSeats((s) => s.seatById[id]);
  const replaceSelection = useSeats((s) => s.replaceSelection);
  const updateSelection = useSeats((s) => s.updateSelection);
  const startMoving = useSeats((s) => s.startMoving);
  const stopMoving = useSeats((s) => s.stopMoving);
  const move = useSeats((s) => s.move);

  const scaledPosition = V2.mul(position, boxSize);

  const classes = useStyles({ moving, scaledPosition, selected });

  return (
    <DraggableCore
      grid={[boxSize, boxSize]}
      onStart={(e) => {
        if (!selected) {
          if (e.ctrlKey) {
            updateSelection(id)
          } else {
            replaceSelection(id);
          }
        }
        startMoving();
      }}
      onStop={() => stopMoving()}
      onDrag={(_, { deltaX, deltaY }) => {
        const delta = V2.div([deltaX, deltaY], boxSize);
        move(delta);
      }}
    >
      <div
    className={classes.box}
    onClick={(e) => e.stopPropagation()}
      >{id}</div>
    </DraggableCore>
  );
};
