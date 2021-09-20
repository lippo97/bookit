import { dayToString } from '@/lib/timetable/days';
import { Day } from '@/lib/timetable/types';
import {
  Chip as MuiChip,
  ChipProps as MuiChipProps,
  Theme,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

type ChipProps = {
  color: 'weekday' | 'weekend' | 'special';
};

const Chip = styled(
  ({ color, ...props }: ChipProps & Omit<MuiChipProps, keyof ChipProps>) => (
    <MuiChip {...props} />
  ),
)(({ theme, color }: { theme: Theme } & ChipProps) => ({
  margin: theme.spacing(0.5),
  backgroundColor:
    color === 'weekend' || color === 'special'
      ? theme.palette.secondary.light
      : undefined,
}));

type DayChipProps = Omit<
  React.PropsWithRef<MuiChipProps>,
  'color' | 'label'
> & {
  day: Day;
} & Partial<ChipProps>;

const selectColor = (day: Day) => {
  if (day < 5) return 'weekday';
  return 'weekend';
};

export const DayChip = ({ day, color, ...props }: DayChipProps) => (
  <Chip
    {...props}
    label={dayToString(3)(day)}
    color={color ?? selectColor(day)}
  />
);
