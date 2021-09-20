/* eslint-disable react/destructuring-assignment */
import { Set } from '@/lib/nonEmptySet';
import { Day } from '@/lib/timetable/types';
import { Box } from '@material-ui/core';
import { DayChip } from './DayChip';

interface DisplayDaysProps {
  readonly selected: Set<Day>;
}

export const DisplayDays = ({ selected }: DisplayDaysProps) => (
  <Box display="flex" flexWrap="wrap">
    {selected.map((value: Day) => (
      <DayChip key={value} day={value} />
    ))}
  </Box>
);
