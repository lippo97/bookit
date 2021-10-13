import SeatComponent from '@/components/picker/Seat';
import * as V2 from '@asw-project/shared/util/vector';
import { Vector2 } from '@asw-project/shared/util/vector';
import { makeStyles } from '@material-ui/core/styles';
import flatMap from 'lodash/flatMap';
import map from 'lodash/map';
import { useState } from 'react';
import QuickPinchZoom, { make3dTransformValue } from 'react-quick-pinch-zoom';
import { UpdateAction } from 'react-quick-pinch-zoom/esm/PinchZoom/types';
import { Board } from './Board';
import { Seat, SparseMatrix } from './types';

interface ContentProps {
  readonly seats: SparseMatrix<Seat>;
  readonly selected: readonly Vector2[];
  readonly size: Vector2;
  handleSelect?(x: number, y: number): void;
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

const renderSeat =
  (
    row: number,
    squareSize: number,
    selected: readonly Vector2[],
    onClick?: (x: number, y: number) => void,
  ) =>
  (seat: Seat | undefined, column: number) => {
    if (seat) {
      return (
        <SeatComponent
          key={seat.id}
          id={seat.id}
          position={V2.mul([column, row], squareSize)}
          squareSize={squareSize}
          onClick={() => onClick && onClick(row, column)}
          selected={selected.some((v) => V2.equals(v, [row, column]))}
        />
      );
    }
    return <></>;
  };

// const renderSeat = (row: number) => (seat: Seat | undefined, column: number) =>
//   seat ? (
//     <>
//       {/* eslint-disable-next-line react/destructuring-assignment */}
//       <p>{seat.id}</p>
//       <p>Services: </p>
//       <p>
//         Position: {row}; {column}
//       </p>
//       <ul>
//         {/* eslint-disable-next-line react/destructuring-assignment */}
//         {seat.services.map((s) => (
//           <li>{s}</li>
//         ))}
//       </ul>
//     </>
//   ) : (
//     <></>
//   );

export const Content = ({
  seats,
  selected,
  size,
  handleSelect,
}: ContentProps) => {
  const classes = useStyles();
  const squareSize = 50;
  // const quickPinchZoomRef = useRef<QuickPinchZoom>(null);
  const [transform, setTransform] = useState('');

  const onUpdate = (upd: UpdateAction) => {
    setTransform(make3dTransformValue(upd));
  };

  return (
    <div className={classes.content}>
      <QuickPinchZoom
        inertiaFriction={0.75}
        horizontalPadding={squareSize / 2}
        verticalPadding={squareSize / 2}
        // ref={quickPinchZoomRef}
        onUpdate={onUpdate}
        containerProps={{ style: { height: '100%' } }}
      >
        <Board boardSize={size} squareSize={squareSize} transform={transform}>
          {flatMap(seats, (row, x) =>
            map(row, renderSeat(x, squareSize, selected, handleSelect)),
          )}
        </Board>
      </QuickPinchZoom>
    </div>
  );
};
