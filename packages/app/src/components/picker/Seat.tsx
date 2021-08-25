import React from 'react';
import { Vector2 } from '@asw-project/shared/util/vector';
import * as V2 from '@asw-project/shared/util/vector';
import SvgSquare from './SvgSquare';

interface SeatProps {
  readonly id: number;

  readonly position: Vector2;

  readonly selected?: boolean;

  readonly squareSize: number;

  onClick?(): void;
}

function Seat({ id, position, onClick, selected, squareSize }: SeatProps) {
  return (
    <SvgSquare
      fill={selected ? '#cde3ff' : '#fff'}
      position={position}
      size={squareSize}
      stroke={selected ? '#438cff' : '#444'}
      strokeWidth={selected ? 5 : 1}
      text={id.toString()}
      onClick={onClick}
    />
  );
}

export default React.memo(Seat);
