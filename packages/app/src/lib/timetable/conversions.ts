import { Library } from '@asw-project/shared/generatedTypes';
import { convert, LocalDate, LocalTime } from '@js-joda/core';
import dayjs, { Dayjs } from 'dayjs';
import { Shift, Timetable } from './types';

export const localTimeToDate = (localTime: LocalTime): Date =>
  convert(localTime.atDate(LocalDate.now())).toDate();

export const dateToLocalTime = (date: Date): LocalTime =>
  LocalTime.of(date.getHours(), date.getMinutes(), date.getSeconds());

export const localTimeToDayjs = (localTime: LocalTime): Dayjs =>
  dayjs(localTimeToDate(localTime));

export const dayjsToLocalTime = (dayjsDate: Dayjs): LocalTime =>
  LocalTime.of(dayjsDate.hour(), dayjsDate.minute(), dayjsDate.second());

export const convertTimetableToDbFormat = (
  timetable: Timetable,
): Library['timetable'] => {
  const go = ({
    days,
    slot: { from, to },
  }: Shift): Library['timetable'][0] => ({
    days: [...days],
    slot: {
      from: localTimeToDate(from),
      to: localTimeToDate(to),
    },
  });
  return timetable.map(go);
};

export const convertDbFormatToTimetable = (
  dbTimetable: Library['timetable'],
): Timetable => {
  const go = ({
    days,
    slot: { from, to },
  }: Library['timetable'][0]): Shift => ({
    days: days as any,
    slot: {
      from: dateToLocalTime(from),
      to: dateToLocalTime(to),
    },
  });
  return dbTimetable.map(go);
};
