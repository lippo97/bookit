import { LocalTime } from '@js-joda/core';
import { NonEmptySet } from '../nonEmptySet';

export type Shift = { slot: Slot; days: NonEmptySet<Day> };
export type Nullable<T> = T | null;
export type Timetable = readonly Shift[];
export type Slot = { from: LocalTime; to: LocalTime };
export type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;
