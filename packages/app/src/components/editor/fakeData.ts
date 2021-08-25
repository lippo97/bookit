import { Vector2 } from '@asw-project/shared/util/vector';
import * as V2 from '@asw-project/shared/util/vector';
import * as Range from '@asw-project/shared/util/ranges';

interface Seat {
  readonly id: any;

  readonly position: Vector2;
}

interface Room {
  readonly size: Vector2;
  seats: Seat[];
}

// const positions = Range.make(0, 20).flatMap((x) =>
//   Range.make(0, 10).map((y: number) => V2.make(x, y)),
// );

const positions: Vector2[] = [
  [1, 1],
  [2, 1],
  [3, 1],
  [4, 1],
  [1, 2],
  [2, 2],
  [3, 2],
  [4, 2],
  [1, 4],
  [2, 4],
  [3, 4],
  [4, 4],
  [1, 5],
  [2, 5],
  [3, 5],
  [4, 5],
  [8, 1],
  [8, 2],
  [8, 3],
  [8, 4],
  [8, 5],
  [9, 1],
  [9, 2],
  [9, 3],
  [9, 4],
  [9, 5],
];

export const seats: Seat[] = positions.map((position: Vector2, id: number) => ({
  position,
  id,
}));

export const room: Room = {
  size: [11, 7] as Vector2,
  seats,
};
