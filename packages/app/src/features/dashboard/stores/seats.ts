import { IS_DEVELOPMENT } from '@/config';
import { log } from '@/stores/_log';
import { myDevtools } from '@/stores/_myDevtools';
import { Vector2 } from '@asw-project/shared/util/vector';
import flow from 'lodash/fp/flow';
import identity from 'lodash/fp/identity';
import mapValues from 'lodash/mapValues';
import pickBy from 'lodash/pickBy';
import create, { GetState } from 'zustand';
import { NamedSet } from 'zustand/middleware';

interface IndexedMap<K extends number | string | symbol, V> {
  readonly index: readonly K[];
  readonly values: Readonly<{
    [k in K]: Readonly<V>
  }>
}

type SeatId = string;

type Seat = {
  position: Vector2;
  moving: boolean;
  selected: boolean;
};

type SeatMap = {
  [k: string]: Seat;
};

type SeatState = {
  seatIds: readonly SeatId[];
  selectedIds: readonly SeatId[];
  seatById: SeatMap;
  select(id: SeatId | SeatId[]): void;
  startMoving(): void;
  move(delta: Vector2): void;
  stopMoving(): void;
};

const seatState = (
  set: NamedSet<SeatState>,
  get: GetState<SeatState>,
): SeatState => ({
  seatIds: ['a', 'b', 'c', 'd', 'e'],
  selectedIds: ['a', 'b'],
  seatById: {
    a: {
      position: [0, 0],
      moving: false,
      selected: true,
    },
    b: {
      position: [1, 0],
      moving: false,
      selected: true,
    },
    c: {
      position: [2, 1],
      moving: false,
      selected: false,
    },
    d: {
      position: [2, 2],
      moving: false,
      selected: false,
    },
    e: {
      position: [2, 3],
      moving: false,
      selected: false,
    },
  },
  select: (ids) => {
    const actualIds = typeof ids === 'string' ? [ids] : ids;
    const { seatIds, seatById, selectedIds: oldSelectedIds } = get();
    const selectedIds = seatIds.filter((id) => actualIds.includes(id));
    const oldSelections = mapValues(
      pickBy(seatById, (_, k) => oldSelectedIds.includes(k)),
      (s) => ({
        ...s,
        selected: false,
      })
    )
    const newSelections = mapValues(
      pickBy(seatById, (_, k) => selectedIds.includes(k)),
      (s) => ({
        ...s,
        selected: true,
      }),
    );
    set({
      selectedIds,
      seatById: {
        ...seatById,
        ...oldSelections,
        ...newSelections,
      }
    })
  },
  move: (delta) => {
    console.log(`move([${delta.toString()}])`);
  },
  startMoving: () => {
    console.log('startMoving()');
  },
  stopMoving: () => {
    console.log('stopMoving()');
  },
});

const middlewares = flow(
  IS_DEVELOPMENT ? myDevtools('Seats') : identity,
  IS_DEVELOPMENT ? log : identity,
);

export const useSeats = create<SeatState>(middlewares(seatState));
