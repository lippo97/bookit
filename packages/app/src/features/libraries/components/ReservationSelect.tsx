import { Timetable } from '@/lib/timetable/types';
import { WithId } from '@asw-project/shared/data/withId';
import { Room } from '@asw-project/shared/generatedTypes';
import { Box, FormControl, MenuItem, TextField } from '@material-ui/core';
import { ChangeEvent, FC } from 'react';

export type Data = [
  Pick<WithId<Room>, '_id' | 'name'>[],
  { key: string; label: string }[],
];

interface ReservationSelectProps {
  data?: Data;
  readonly status: 'success' | 'error' | 'loading' | 'idle';
  readonly values: [string, string];
  onChange(updated: [string, string]): void;
}

export const ReservationSelect: FC<ReservationSelectProps> = ({
  data,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  status,
  values: [selectedRoomId, selectedTimeRange],
  onChange,
}) => {
  const onRoomChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange([value, selectedTimeRange]);
  };

  const onTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange([selectedRoomId, value]);
  };

  return (
    <Box py={2}>
      <FormControl fullWidth style={{ marginBottom: 16 }}>
        <TextField
          select
          label="Room"
          value={selectedRoomId}
          onChange={onRoomChange}
        >
          {data &&
            data[0].map(({ _id, name }) => (
              <MenuItem key={_id} value={_id}>
                {name}
              </MenuItem>
            ))}
        </TextField>
      </FormControl>
      <FormControl fullWidth>
        <TextField
          select
          label="Time"
          value={selectedTimeRange}
          onChange={onTimeChange}
        >
          {data &&
            data[1].map(({ key, label }) => (
              <MenuItem key={key} value={key}>
                {label}
              </MenuItem>
            ))}
        </TextField>
      </FormControl>
    </Box>
  );
};
