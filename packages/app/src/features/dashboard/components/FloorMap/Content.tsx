import SeatComponent from '@/components/picker/Seat';
import { Vector2 } from '@asw-project/shared/util/vector';
import * as V2 from '@asw-project/shared/util/vector';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import flatMap from 'lodash/flatMap';
import map from 'lodash/map';
import { useMediaQuery } from '@material-ui/core';
import { Board } from './Board';
import { Seat, SparseMatrix } from './types';

interface ContentProps {
  readonly seats: SparseMatrix<Seat>;
  readonly size: Vector2;
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
  (row: number, squareSize: number) =>
  (seat: Seat | undefined, column: number) => {
    if (seat) {
      return (
        <SeatComponent
          key={seat.id}
          id={seat.id}
          position={V2.mul([column, row], squareSize)}
          squareSize={squareSize}
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

export const Content = ({ seats, size }: ContentProps) => {
  const classes = useStyles();
  const squareSize = 50;

  return (
    <div className={classes.content}>
      <div className={classes.canvas}>
        <Board boardSize={size} squareSize={squareSize}>
          {flatMap(seats, (row, x) => map(row, renderSeat(x, squareSize)))}
        </Board>
      </div>
    </div>
  );
};
