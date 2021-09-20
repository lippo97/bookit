/* eslint-disable @typescript-eslint/no-shadow */
import { LocalTime } from '@js-joda/core';
import dropRight from 'lodash/dropRight';
import eq from 'lodash/fp/eq';
import not from 'lodash/fp/negate';
import mergeWith from 'lodash/mergeWith';
import reduce from 'lodash/reduce';
import tail from 'lodash/tail';
import values from 'lodash/values';
import zip from 'lodash/zip';
import { NonEmptySet } from '../nonEmptySet';
import { Day, Nullable, Shift, Slot, Timetable } from './types';

export const isValidPeriod = (from: LocalTime, to: LocalTime): boolean =>
  from.isBefore(to);

export const slot = (from: LocalTime, to: LocalTime): Nullable<Slot> =>
  isValidPeriod(from, to) ? { from, to } : null;

export const shift = (slot: Slot, days: NonEmptySet<Day>): Shift => ({
  slot,
  days,
});

export const isValidSlot = ({ from, to }: Slot): boolean =>
  isValidPeriod(from, to);

type GroupedByDay = {
  [k in Day]: Slot[];
};

export const empty: Timetable = [];

export const isEmpty = (timetable: Timetable): boolean =>
  timetable.length === 0;

export const groupByDay = (timetable: Timetable): GroupedByDay =>
  reduce<Shift, GroupedByDay>(
    timetable,
    (acc, current) => {
      const dayToSlot = reduce(
        current.days,
        (acc, t) => ({
          [t]: current.slot,
          ...acc,
        }),
        {},
      );
      const merged = mergeWith(dayToSlot, acc, (x, y) =>
        (y ?? []).concat(x ?? []),
      );
      return merged;
    },
    [[], [], [], [], [], [], []] as GroupedByDay,
  );

const insert =
  <T>(index: number, t: T) =>
  (array: readonly T[]): readonly T[] =>
    [...array.slice(0, index), t, ...array.slice(index)];

export const addShift =
  (shift: Shift, index?: number) =>
  (timetable: Timetable): Nullable<Timetable> => {
    const areNotOverlapping = (slots: Slot[]): boolean => {
      const sorted = slots.sort(({ from: x }, { from: y }) => x.compareTo(y));
      const zipped = dropRight(zip(sorted, tail(sorted))) as [Slot, Slot][];
      return zipped.every(([x, y]) => x.to.isBefore(y.from));
    };

    const temp =
      index !== undefined
        ? insert(index, shift)(timetable)
        : [...timetable, shift];

    return values(groupByDay(temp)).every(areNotOverlapping) ? temp : null;
  };

export const removeShift =
  (shift: Shift) =>
  (timetable: Timetable): Timetable =>
    timetable.filter(not(eq(shift)));

export const removeShiftByIndex =
  (index: number) =>
  (timetable: Timetable): Timetable =>
    timetable.filter((_, i) => not(eq(index))(i));
