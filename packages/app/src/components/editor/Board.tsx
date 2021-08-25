import * as Vector2 from '@asw-project/shared/util/vector';
import { makeStyles } from '@material-ui/core/styles';
import useRect from 'app/src/hooks/useRect';
import { useRef, useState } from 'react';
import QuickPinchZoom, { make3dTransformValue } from 'react-quick-pinch-zoom';
import { room } from './fakeData';
import Grid from '../picker/Grid';
import Seat from '../picker/Seat';

const useStyles = makeStyles((theme) => ({
  main: {
    gridArea: 'main',
    background: '#f1f1f1',
    overflow: 'scroll',
  },
}));

interface BoardProps {
  onClick(x: number, y: number): void;
}

function Board({ onClick }: BoardProps) {
  const classes = useStyles();
  const ref = useRef<HTMLDivElement | null>(null);
  const rect = useRect(ref);
  const [transform, setTransform] = useState<string>('');
  const [selectedSeat, setSelectedSeat] = useState<any>(null);

  const squareSize = 80;

  const [viewBoxX, viewBoxY] = Vector2.mul(room.size, squareSize);

  const handleSeatClick = (id: any) => setSelectedSeat(id);

  function renderSelectedSeat() {
    if (selectedSeat !== null) {
      return (
        <div style={{ width: '100%', height: '30vh' }}>
          Hai selezionato {selectedSeat}
        </div>
      );
    }
    return '';
  }

  return (
    <div
      ref={ref}
      className={classes.main}
      onClick={({ clientX: clickX, clientY: clickY }) => {
        if (rect) {
          const offset = Vector2.offsetFromDOMRect(rect);
          const click = Vector2.make(clickX, clickY);
          const [x, y] = Vector2.sub(click, offset);
          onClick(x, y);
        }
      }}
    >
      <div
        style={{
          boxSizing: 'border-box',
          margin: 10,
          border: '3px solid black',
          overflow: 'hidden',
        }}
      >
        <QuickPinchZoom
          inertiaFriction={0.9}
          horizontalPadding={squareSize / 2}
          verticalPadding={squareSize / 2}
          onUpdate={(upd) => setTransform(make3dTransformValue(upd))}
        >
          <svg
            // viewBox={`0 0 1600 800`}
            viewBox={`0 0 ${viewBoxX} ${viewBoxY}`}
            style={{
              transform,
              transformOrigin: '0 0',
              height: '60vh'
            }}
          >
            <Grid size={squareSize} />
            {room.seats.map((s) => {
              return (
                <Seat
                  key={s.id}
                  position={Vector2.mul(s.position, squareSize)}
                  id={s.id}
                squareSize={80}
                  onClick={() => handleSeatClick(s.id)}
                />
              );
            })}
          </svg>
        </QuickPinchZoom>
      </div>
      {renderSelectedSeat()}
    </div>
  );
}

export default Board;
