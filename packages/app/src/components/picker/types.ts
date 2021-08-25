import { Vector2 } from '@asw-project/shared/util/vector';

export interface Seat {
  readonly id: any;
  readonly position: Vector2;
}

export interface Room {
  readonly size: Vector2;
  readonly seats: Seat[];
}
