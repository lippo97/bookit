import { Vector2 } from '@asw-project/shared/util/vector';
import * as V2 from '@asw-project/shared/util/vector';
import { Box, useMediaQuery, useTheme } from '@material-ui/core';
import Grid from './Grid';

interface BoardProps {
  readonly children: React.ReactNode;
  readonly boardSize: Vector2;
  readonly squareSize: number;
  readonly transform: string;
}

export const Board = ({
  children,
  boardSize,
  squareSize,
  transform,
}: BoardProps) => {
  // const theme = useTheme();
  // const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const [viewBoxX, viewBoxY] = V2.mul(boardSize, squareSize);

  return (
    <>
      <Box
        // width="100%"
        // height={viewBoxY}
        style={{
          transform,
          transformOrigin: '0 0',
          willChange: 'transform',
          padding: '30px',
        }}
      >
        <svg
          viewBox={`0 0 ${viewBoxX} ${viewBoxY}`}
          style={{
            border: '1px solid black',
          }}
        >
          <Grid size={squareSize} />
          {children}
        </svg>
      </Box>
    </>
  );
};
