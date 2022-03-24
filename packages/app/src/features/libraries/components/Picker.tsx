import { IconButton, Box, Typography, Paper } from '@material-ui/core';

import { useState } from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

interface PickerProps<T> {
  readonly data: readonly T[];
  readonly children: (t: T) => React.ReactNode;
  format(data: T): string;
}

export function Picker<T>({ data, format, children }: PickerProps<T>) {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((index + 1) % data.length);
  };
  const handlePrev = () => {
    setIndex((data.length + index - 1) % data.length);
  };

  console.log(data);
  const selected = data[index];

  return (
    <Box display="flex" flexDirection="column">
      <Paper square>
        <Box display="flex" flexDirection="row" alignItems="center">
          <IconButton onClick={handlePrev}>
            <ChevronLeftIcon />
          </IconButton>
          <Box flex={1}>
            <Typography align="center" variant="body1">
              {format(selected)}
            </Typography>
          </Box>
          <IconButton onClick={handleNext}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Paper>
      {children(selected)}
    </Box>
  );
}
