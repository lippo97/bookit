import { Vector2 } from '@asw-project/shared/util/vector';
import * as V2 from '@asw-project/shared/util/vector';
import { Box, useMediaQuery, useTheme } from '@material-ui/core';
import Grid from './Grid';

interface BoardProps {
  readonly children: React.ReactNode;
  readonly boardSize: Vector2;
  readonly squareSize: number;
}

export const Board = ({
  children,
  boardSize,
  squareSize,
}: BoardProps) => {
  const [viewBoxX, viewBoxY] = V2.mul(boardSize, squareSize);

  return (
    <>
      <svg
        viewBox={`0 0 ${viewBoxX} ${viewBoxY}`}
        style={{
          border: '1px solid black',
        }}
      >
        <Grid size={squareSize} />
        {children}
      </svg>
    </>
  );
};
