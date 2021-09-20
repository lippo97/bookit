import { Day } from './types';

const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

export const dayToString =
  (length: number = Number.MAX_SAFE_INTEGER) =>
  (day: Day): string =>
    days[day].substr(0, length);
