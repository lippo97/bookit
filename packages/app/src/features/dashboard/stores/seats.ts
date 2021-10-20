/* eslint-disable no-console */
import { IS_DEVELOPMENT } from '@/config';
import { log } from '@/stores/_log';
import { myDevtools } from '@/stores/_myDevtools';
import { Vector2 } from '@asw-project/shared/util/vector';
import * as V2 from '@asw-project/shared/util/vector';
import flow from 'lodash/fp/flow';
import identity from 'lodash/fp/identity';
import mapValues from 'lodash/mapValues';
import pickBy from 'lodash/pickBy';
import create, { GetState } from 'zustand';
import { NamedSet } from 'zustand/middleware';
import partition from 'lodash/partition';
import flatMap from 'lodash/flatMap';
import map from 'lodash/map';
import values from 'lodash/values';
// import lt from 'lodash/fp/lt';
import zipWith from 'lodash/zipWith';

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
  selectedSnapshot: SeatMap;
  clearSelection(): void;
  updateSelection(id: SeatId | SeatId[]): void;
  replaceSelection(id: SeatId | SeatId[]): void;
  startMoving(): void;
  move(delta: Vector2): void;
  stopMoving(): void;
  size: Vector2;
  setSize(size: Vector2): void;
};

const updateAt =
  <T>() =>
  <K extends keyof T>(k: K, f: (a: T[K]) => T[K]) =>
  (t: T): T => ({
    ...t,
    [k]: f(t[k]),
  });

const setAt =
  <T>() =>
  <K extends keyof T>(k: K, updated: T[K]) =>
    updateAt<T>()(k, () => updated);

const isTrue = (t: boolean) => t;
const lt =
  (n: number) =>
  (m: number): boolean =>
    m < n;
const gte = (n: number, m: number): boolean => n >= m;

const isOutOfBounds =
  (bounds: Vector2) =>
  ({ position }: Seat): boolean =>
    position.some(lt(0)) || zipWith(position, bounds, gte).some(isTrue);

const updatePosition =
  (f: (old: Vector2) => Vector2) =>
  (seat: Seat): Seat => ({
    ...seat,
    position: f(seat.position),
  });

const seatState = (
  set: NamedSet<SeatState>,
  get: GetState<SeatState>,
): SeatState => ({
  selectedSnapshot: {},
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
  clearSelection: () => {
    set({
      selectedIds: [],
      seatById: mapValues(get().seatById, setAt<Seat>()('selected', false)),
    });
  },
  updateSelection: (ids) => {
    const actualIds = typeof ids === 'string' ? [ids] : ids;
    const { selectedIds, seatById } = get();
    const toBeSelected = actualIds.filter((id) => !selectedIds.includes(id));
    const newSelections = mapValues(
      pickBy(seatById, (_, k) => toBeSelected.includes(k)),
      (s) => ({
        ...s,
        selected: true,
      }),
    );

    set({
      selectedIds: [...selectedIds, ...toBeSelected],
      seatById: {
        ...seatById,
        ...newSelections,
      },
    });
  },
  replaceSelection: (ids) => {
    const actualIds = typeof ids === 'string' ? [ids] : ids;
    const { seatIds, seatById, selectedIds: oldSelectedIds } = get();
    const selectedIds = seatIds.filter((id) => actualIds.includes(id));
    const oldSelections = mapValues(
      pickBy(seatById, (_, k) => oldSelectedIds.includes(k)),
      (s) => ({
        ...s,
        selected: false,
      }),
    );
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
      },
    });
  },
  move: (delta) => {
    console.log(`move([${delta.toString()}])`);
    const { selectedIds, seatById, size } = get();

    const moved = mapValues(
      pickBy(seatById, (_, k) => selectedIds.includes(k)),
      updatePosition((old) => V2.sum(delta, old)),
    );

    if (!values(moved).some(isOutOfBounds(size))) {
      set({
        seatById: {
          ...seatById,
          ...moved,
        },
      });
    }
  },
  startMoving: () => {
    console.log('startMoving()');
    const { selectedIds, seatById } = get();
    const selectedSnapshot = pickBy(seatById, (_, k) =>
      selectedIds.includes(k),
    );
    set({
      selectedSnapshot,
    });
  },
  stopMoving: () => {
    console.log('stopMoving()');
    const { seatById, selectedSnapshot } = get();
    const [selected, unselected] = partition(seatById, (x) => x.selected);
    const positionPairs = flatMap(selected, (s1) =>
      map(unselected, (s2) => [s1.position, s2.position] as [Vector2, Vector2]),
    );
    const collides = positionPairs.some(([v1, v2]) => V2.equals(v1, v2));
    if (collides) {
      set({
        seatById: {
          ...seatById,
          ...selectedSnapshot,
        },
      });
    }
  },
  size: [0, 0],
  setSize: (size) =>
    set({
      size,
    }),
});

const middlewares = flow(
  IS_DEVELOPMENT ? myDevtools('Seats') : identity,
  IS_DEVELOPMENT ? log : identity,
);

export const useSeats = create<SeatState>(middlewares(seatState));
