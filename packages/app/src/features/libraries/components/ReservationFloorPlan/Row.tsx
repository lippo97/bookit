import { Box } from '@material-ui/core';
import { FC, Ref } from 'react';
import { SeatGrid } from '../../api/reservations';
import { Cell } from './Cell';

export const Row: FC<{
  data: SeatGrid[number];
  selectedRef?: Ref<HTMLDivElement>;
  selected?: string;
  setSelected?: (update: [string, number]) => void;
}> = ({ data, selectedRef, selected, setSelected }) => (
  <Box display="flex" flexDirection="row" px={2}>
    {data.map((cell, i) => {
      if (cell === undefined) {
        // eslint-disable-next-line react/no-array-index-key
        return <Cell key={i} empty />;
      }
      if (cell.isReserved) {
        return (
          <Cell
            reserved
            selected={cell._id === selected}
            label={cell.label}
            services={cell.services}
            ref={cell._id === selected ? selectedRef : undefined}
          />
        );
      }
      return (
        <Cell
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          id={cell._id}
          selected={cell._id === selected}
          setSelected={setSelected}
          label={cell.label}
          services={cell.services}
          ref={cell._id === selected ? selectedRef : undefined}
        />
      );
    })}
  </Box>
);
