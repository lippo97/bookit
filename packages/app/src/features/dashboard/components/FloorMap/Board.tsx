import { Vector2 } from '@asw-project/shared/util/vector';
import * as V2 from '@asw-project/shared/util/vector';
import { useMediaQuery, useTheme } from '@material-ui/core';
import Grid from './Grid';

interface BoardProps {
  readonly children: React.ReactNode;
  readonly boardSize: Vector2;
  readonly squareSize: number;
}

export const Board = ({ children, boardSize, squareSize }: BoardProps) => {
  const transform = undefined;
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const [viewBoxX, viewBoxY] = isSmall
    ? V2.mul(boardSize, squareSize / 2)
    : V2.mul(boardSize, squareSize);

  return (
    <>
      <svg
        viewBox={`0 0 ${viewBoxX} ${viewBoxY}`}
        style={{
          transform,
          transformOrigin: '0 0',
        }}
      >
        <Grid size={squareSize} />
        {children}
      </svg>
    </>
  );
};
