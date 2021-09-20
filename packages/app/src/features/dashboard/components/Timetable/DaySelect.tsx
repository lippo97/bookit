import { NonEmptySet, Set } from '@/lib/nonEmptySet';
import { dayToString } from '@/lib/timetable/days';
import { Day } from '@/lib/timetable/types';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { ChangeEvent } from 'react';
import { DisplayDays } from './DisplayDays';

interface DaySelectProps {
  readonly days: Set<Day>;
  readonly onChange: (days: Set<Day>) => void;
}

export const DaySelect = ({ days, onChange }: DaySelectProps) => {
  const handleChange = ({
    target: { value },
  }: ChangeEvent<{ value: unknown }>) => onChange(value as Set<Day>);

  return (
    <FormControl>
      <Select
        multiple
        value={days}
        renderValue={(value) => (
          <DisplayDays selected={value as NonEmptySet<Day>} />
        )}
        onChange={handleChange}
      >
        {([0, 1, 2, 3, 4, 5, 6] as Day[]).map((name) => (
          <MenuItem key={name} value={name}>
            {dayToString()(name)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
