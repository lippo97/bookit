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
import { Service } from '@asw-project/shared/generatedTypes';
import { WithId } from '@asw-project/shared/data/withId';
import filter from 'lodash/filter';

type SeatId = string;

type Seat = {
  _id?: string;
  label: string;
  position: Vector2;
  previouslyExisting: boolean;
  moving: boolean;
  selected: boolean;
  services: {
    [k in Service]?: boolean;
  };
};

export type SeatMap = {
  [k: string]: Seat;
};

type SeatState = {
  seatIds: readonly SeatId[];
  selectedIds: readonly SeatId[];
  seatById: SeatMap;
  selectedSnapshot: SeatMap;
  size: Vector2;
  toBeRemoved: readonly SeatId[];
  _nextSeatId: number;
  initialize(initialSeats: SeatMap): void;
  getNextSeatId(): SeatId;
  addSeat(
    id: SeatId,
    seat: Omit<Seat, 'services' | 'moving' | 'selected'>,
  ): boolean;
  removeSeat(id: SeatId | readonly SeatId[]): void;
  selectAll(): void;
  clearSelection(): void;
  updateSelection(id: SeatId | readonly SeatId[]): void;
  replaceSelection(id: SeatId | readonly SeatId[]): void;
  setSelectionService(service: Service, value: boolean): void;
  startMoving(): void;
  // move(delta: Vector2): void;
  move(delta: Vector2, ensureSelected?: SeatId): void;
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
  seatIds: [],
  selectedIds: [],
  seatById: {},
  toBeRemoved: [],
  _nextSeatId: 0,
  initialize: (seats) => {
    const seatIds = Object.keys(seats);
    let nextSeatId = 0;
    while (seatIds.includes(nextSeatId.toString())) {
      // eslint-disable-next-line no-plusplus
      nextSeatId++;
    }

    set({
      seatById: seats,
      seatIds,
      selectedIds: [],
      toBeRemoved: [],
      _nextSeatId: nextSeatId,
    });
  },
  getNextSeatId: () => {
    const { _nextSeatId: old, seatIds } = get();

    let newSeatId = old + 1;
    while (seatIds.includes(newSeatId.toString())) {
      // eslint-disable-next-line no-plusplus
      newSeatId++;
    }
    set({
      _nextSeatId: newSeatId,
    });
    console.log('for', seatIds);
    console.log('giving', old);
    console.log('updating to', newSeatId);
    return old.toString();
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
        [id]: { ...seat, moving: false, selected: false, services: {} },
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
      toBeRemoved,
    } = get();
    const seatIds = oldSeatIds.filter((id) => !actualIds.includes(id));
    const selectedIds = oldSelectedIds.filter((id) => !actualIds.includes(id));
    const updatedToBeRemoved = map(
      filter(
        pickBy(seatById, (_, k) => actualIds.includes(k)),
        (x) => x.previouslyExisting,
      ),
      (x) => x._id!,
    );
    set({
      seatIds,
      selectedIds,
      seatById: pickBy(seatById, (_, k) => seatIds.includes(k)),
      toBeRemoved: [...toBeRemoved, ...updatedToBeRemoved],
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
    const { selectedIds, seatById, seatIds } = get();
    const toBeUpdated = actualIds.filter((id) => seatIds.includes(id));

    const [toBeSelected, toBeUnselected] = partition(
      toBeUpdated,
      (el) => !selectedIds.includes(el),
    );

    const newSelections = mapValues(
      pickBy(seatById, (_, k) => toBeUpdated.includes(k)),
      (s) => ({
        ...s,
        selected: !s.selected,
      }),
    );

    set({
      selectedIds: [
        ...selectedIds.filter((id) => !toBeUnselected.includes(id)),
        ...toBeSelected,
      ],
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
  setSelectionService: (service, value) => {
    const { seatById, selectedIds } = get();
    const updatedSelection = mapValues(
      pickBy(seatById, (_, k) => selectedIds.includes(k)),
      // unfortunately we didn't use lenses in this project
      (s) => ({
        ...s,
        services: {
          ...s.services,
          [service]: value,
        },
      }),
    );

    set({
      seatById: {
        ...seatById,
        ...updatedSelection,
      },
    });
  },
  move: (delta, ensureSelected) => {
    console.log(`move([${delta.toString()}], ${ensureSelected})`);
    const { selectedIds, seatById, size } = get();

    const moved = mapValues(
      pickBy(seatById, (_, k) =>
        [...selectedIds, ensureSelected ?? 'INVALID'].includes(k),
      ),
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
    console.log('current selected ids', selectedIds);
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
  setSize: (size) => {
    const { seatById } = get();
    const [x, y] = size;

    // Prevent inconsistent state
    if (values(seatById).some(({ position: [sX, sY] }) => sX >= x || sY >= y))
      return;

    set({
      size,
    });
  },
});

const middlewares = flow(IS_DEVELOPMENT ? myDevtools('Seats') : identity);

export const useSeats = create<SeatState>(middlewares(seatState));
