import { iconForServiceCurried } from '@/features/dashboard/components/FloorMap/Seat';
import { Service } from '@asw-project/shared/generatedTypes';
import { Box } from '@material-ui/core';
import { CSSProperties, FC, forwardRef } from 'react';

const cellSize = 50;
const commonProps: CSSProperties = {
  padding: 1,
  minWidth: cellSize,
  width: cellSize,
  minHeight: cellSize,
  height: cellSize,
  fontWeight: 'bold',
  display: 'flex',
  flexDirection: 'column',
};

const Services: FC<{ data: Service[] }> = ({ data }) => (
  <Box
    display="flex"
    flexDirection="row"
    flexWrap="wrap"
    justifyContent="flex-end"
    alignItems="flex-end"
    flex={1}
  >
    {data.map(
      iconForServiceCurried({
        height: 12,
        width: 12,
        marginLeft: 2,
      }),
    )}
  </Box>
);

export const Cell = forwardRef<
  HTMLDivElement,
  | { empty: true; label?: never }
  | {
      empty?: never;
      reserved: true;
      label: number;
      id?: never;
      selected: boolean;
      setSelected?: never;
      services: Service[];
    }
  | {
      empty?: never;
      reserved?: never;
      id: string;
      label: number;
      selected: boolean;
      setSelected?: (update: [string, number]) => void;
      services: Service[];
    }
>((props, ref) => {
  if (props.empty) {
    return (
      <div
        style={{
          ...commonProps,
          margin: '-1px 0 0 -1px',
          border: '1px solid #dedede',
          backgroundColor: 'white',
          zIndex: 0,
        }}
      />
    );
  }
  const ifSelected: CSSProperties = props.selected
    ? {
        outline: 'rgb(85, 132, 149) solid 1px',
        border: 'rgb(85, 132, 149) solid 1px',
        backgroundColor: 'rgb(186, 227, 240)',
        zIndex: 10,
      }
    : {};
  if (props.reserved) {
    return (
      <div
        ref={ref}
        style={{
          ...commonProps,
          margin: '-1px 0 0 -1px',
          border: '1px solid #dedede',
          backgroundColor: '#efefef',
          zIndex: 0,
          ...ifSelected,
        }}
      >
        {props.label}
        <Services data={props.services} />
      </div>
    );
  }
  const onClick = () => {
    if (props.setSelected) {
      props.setSelected([props.id, props.label]);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      ref={ref}
      style={{
        ...commonProps,
        margin: '-1px 0 0 -1px',
        border: '1px solid rgb(156, 190, 202)',
        backgroundColor: 'rgb(235, 247, 251)',
        zIndex: 1,
        ...ifSelected,
      }}
      onClick={onClick}
    >
      {props.label}
      <Services data={props.services} />
    </div>
  );
});
