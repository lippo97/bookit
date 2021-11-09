import * as V2 from '@asw-project/shared/util/vector';
import { Vector2 } from '@asw-project/shared/util/vector';
import { Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { DraggableCore, DraggableEvent } from 'react-draggable';
import { Tool, useEditor } from '../../stores/editor';
import { useSeats } from '../../stores/seats';
import { boxSize } from './constants';
import WifiIcon from '@material-ui/icons/Wifi';
import ComputerIcon from '@material-ui/icons/Computer';
import SettingsInputHdmiIcon from '@material-ui/icons/SettingsInputHdmi';
import PrintIcon from '@material-ui/icons/Print';
import PowerIcon from '@material-ui/icons/Power';
import { Property } from '../../types/Property';
import { CSSProperties } from 'react';

// eslint-disable-next-line consistent-return
const iconForProperty = (
  property: Property,
  style?: CSSProperties,
): React.ReactNode => {
  switch (property) {
    case 'Wi-Fi':
      return <WifiIcon style={style} />;
    case 'Computer':
      return <ComputerIcon style={style} />;
    case 'Power supply':
      return <PowerIcon style={style} />;
    case 'Ethernet':
      return <SettingsInputHdmiIcon style={style} />;
    case 'Printer':
      return <PrintIcon style={style} />;
  }
};

const iconForPropertyCurried = (style: CSSProperties) => (property: Property) =>
  iconForProperty(property, style);

interface SeatProps {
  readonly id: string;
}

const caseCursor = (selected: boolean, selectedTool: Tool) => {
  if (selectedTool === 'remove') return 'pointer';
  if (selectedTool === 'select' && selected) return 'move';
  return 'pointer';
};

const useStyles = makeStyles({
  box: ({
    scaledPosition,
    moving,
    selected,
    selectedTool,
  }: {
    scaledPosition: Vector2;
    moving: boolean;
    selected: boolean;
    selectedTool: Tool;
  }) => ({
    position: 'absolute',
    width: `${boxSize + 1}px`,
    height: `${boxSize + 1}px`,
    top: `${scaledPosition[1]}px`,
    left: `${scaledPosition[0] - 1}px`,
    background: moving ? '#ffffffaa' : '#ffffff',
    border: selected ? '2px dotted #111' : '1px solid #999',
    zIndex: selected ? 1 : 0,
    cursor: caseCursor(selected, selectedTool),
  }),
});

export const Seat = ({ id }: SeatProps) => {
  const selectedTool = useEditor((s) => s.selectedTool);
  const scale = useEditor((s) => s.scale);
  const { moving, position, selected, properties } = useSeats(
    (s) => s.seatById[id],
  );
  const replaceSelection = useSeats((s) => s.replaceSelection);
  const updateSelection = useSeats((s) => s.updateSelection);
  const removeSeat = useSeats((s) => s.removeSeat);
  const startMoving = useSeats((s) => s.startMoving);
  const stopMoving = useSeats((s) => s.stopMoving);
  const move = useSeats((s) => s.move);

  const scaledPosition = V2.mul(position, boxSize);
  const classes = useStyles({ moving, scaledPosition, selected, selectedTool });

  /*
   * Unfortunately down below it's gonna be a mess of FSM logic.
   */
  const draggableProps =
    selectedTool === 'select'
      ? {
          onStart: (e: DraggableEvent) => {
            e.stopPropagation();
            if (!selected) {
              if (e.ctrlKey) {
                updateSelection(id);
              } else {
                replaceSelection(id);
              }
            }
            startMoving();
          },
          onStop: () => stopMoving(),
          onDrag: (
            e: DraggableEvent,
            { deltaX, deltaY }: { deltaX: number; deltaY: number },
          ) => {
            e.stopPropagation();
            const delta = V2.div([deltaX, deltaY], boxSize);
            move(delta);
          },
        }
      : {};

  return (
    <DraggableCore grid={[boxSize, boxSize]} scale={scale} {...draggableProps}>
      <div
        className={clsx(classes.box, 'box')}
        onClick={(e) => {
          e.stopPropagation();
          if (selectedTool === 'remove') {
            removeSeat(id);
          }
        }}
      >
        <Box display="flex" flexDirection="column" height="100%" p="1px">
          <span style={{ fontWeight: 'bold' }}>{id}</span>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="flex-end"
            alignItems="flex-end"
            flex={1}
          >
            {Object.entries(properties)
              .filter(([_, v]) => v)
              .map(([k]) => k as Property)
              .map(
                iconForPropertyCurried({
                  height: 12,
                  width: 12,
                  marginLeft: 2,
                }),
              )}
          </Box>
        </Box>
      </div>
    </DraggableCore>
  );
};
