import { FC, useRef, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { SeatGrid } from '../../api/reservations';
import { Row } from './Row';

interface Interactive {
  readonly interactive: true;
  readonly selected?: string;
  readonly setSelected: (update: [string, number]) => void;
}

interface NonInteractive {
  readonly interactive?: never;
  readonly selected: string;
  readonly setSelected?: never;
}

type ReservationFloorPlanProps = {
  readonly seatGrid: SeatGrid;
} & (Interactive | NonInteractive);

const Window: FC = (props) => (
  <Box flex={1} overflow="scroll" border="1px solid #bbb" {...props} />
);

export const ReservationFloorPlan: FC<ReservationFloorPlanProps> = ({
  seatGrid,
  selected,
  interactive,
  setSelected,
}) => {
  const selectedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!interactive && selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [selectedRef.current]);

  return (
    <Window>
      <Box id="target" py={2}>
        {seatGrid.map((row, i) => (
          <Row
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            data={row}
            selectedRef={selectedRef}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </Box>
    </Window>
  );
};
