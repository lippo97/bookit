import { convert, LocalDate, LocalTime } from '@js-joda/core';
import dayjs, { Dayjs } from 'dayjs';

export const localTimeToDate = (localTime: LocalTime): Date =>
  convert(localTime.atDate(LocalDate.now())).toDate();

export const dateToLocalTime = (date: Date): LocalTime =>
  LocalTime.of(date.getHours(), date.getMinutes(), date.getSeconds());

export const localTimeToDayjs = (localTime: LocalTime): Dayjs =>
  dayjs(localTimeToDate(localTime));

export const dayjsToLocalTime = (dayjsDate: Dayjs): LocalTime =>
  LocalTime.of(dayjsDate.hour(), dayjsDate.minute(), dayjsDate.second());
