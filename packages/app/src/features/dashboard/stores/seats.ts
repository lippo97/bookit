/* eslint-disable no-console */
import { IS_DEVELOPMENT } from '@/config';
import { log } from '@/stores/_log';
import { myDevtools } from '@/stores/_myDevtools';
import * as V2 from '@asw-project/shared/util/vector';
import { Vector2 } from '@asw-project/shared/util/vector';
import flatMap from 'lodash/flatMap';
import flow from 'lodash/fp/flow';
import identity from 'lodash/fp/identity';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import partition from 'lodash/partition';
import pickBy from 'lodash/pickBy';
import values from 'lodash/values';
import zipWith from 'lodash/zipWith';
import create, { GetState } from 'zustand';
import { NamedSet } from 'zustand/middleware';
import { Property } from '../types/Property';

type SeatId = string;

type Seat = {
  position: Vector2;
  moving: boolean;
  selected: boolean;
  properties: {
    [k in Property]?: boolean;
  };
};

type SeatMap = {
  [k: string]: Seat;
};

type SeatState = {
  seatIds: readonly SeatId[];
  selectedIds: readonly SeatId[];
  seatById: SeatMap;
  selectedSnapshot: SeatMap;
  size: Vector2;
  addSeat(
    id: SeatId,
    seat: Omit<Seat, 'properties' | 'moving' | 'selected'>,
  ): boolean;
  removeSeat(id: SeatId | readonly SeatId[]): void;
  selectAll(): void;
  clearSelection(): void;
  updateSelection(id: SeatId | readonly SeatId[]): void;
  replaceSelection(id: SeatId | readonly SeatId[]): void;
  setSelectionProperty(property: Property, value: boolean): void;
  startMoving(): void;
  move(delta: Vector2): void;
  stopMoving(): void;
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

const hasPosition =
  (position2: V2.Vector2) =>
  ({ position }: Seat): boolean =>
    V2.equals(position, position2);

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
      properties: {
        Computer: true,
        'Wi-Fi': true,
        'Power supply': true,
      },
    },
    b: {
      position: [1, 0],
      moving: false,
      selected: true,
      properties: {
        'Wi-Fi': true,
      },
    },
    c: {
      position: [2, 1],
      moving: false,
      selected: false,
      properties: {
        'Wi-Fi': true,
      },
    },
    d: {
      position: [2, 2],
      moving: false,
      selected: false,
      properties: {
        'Wi-Fi': true,
      },
    },
    e: {
      position: [2, 3],
      moving: false,
      selected: false,
      properties: {
        'Wi-Fi': true,
      },
    },
  },
  addSeat: (id, seat) => {
    const { seatIds, seatById } = get();
    if (
      seatIds.includes(id) ||
      values(seatById).some(hasPosition(seat.position))
    ) {
      return false;
    }
    set({
      seatIds: [...seatIds, id],
      seatById: {
        ...seatById,
        [id]: { ...seat, moving: false, selected: false, properties: {} },
      },
    });
    return true;
  },
  removeSeat: (ids) => {
    const actualIds = typeof ids === 'string' ? [ids] : ids;
    const {
      seatById,
      seatIds: oldSeatIds,
      selectedIds: oldSelectedIds,
    } = get();
    const seatIds = oldSeatIds.filter((id) => !actualIds.includes(id));
    const selectedIds = oldSelectedIds.filter((id) => !actualIds.includes(id));
    set({
      seatIds,
      selectedIds,
      seatById: pickBy(seatById, (_, k) => seatIds.includes(k)),
    });
  },
  selectAll: () => {
    set({
      selectedIds: get().seatIds,
      seatById: mapValues(get().seatById, setAt<Seat>()('selected', true)),
    });
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
  setSelectionProperty: (property, value) => {
    const { seatById, selectedIds } = get();
    const updatedSelection = mapValues(
      pickBy(seatById, (_, k) => selectedIds.includes(k)),
      // unfortunately we didn't use lenses in this project
      (s) => ({
        ...s,
        properties: {
          ...s.properties,
          [property]: value,
        }
      })
    );

    set({
      seatById: {
        ...seatById,
        ...updatedSelection,
      }
    })

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
