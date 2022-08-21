import { Service } from '@asw-project/shared/generatedTypes';
import { CSSProperties, forwardRef } from 'react';

const cellSize = 50;
const commonProps: CSSProperties = {
  padding: 2,
  minWidth: cellSize,
  width: cellSize,
  minHeight: cellSize,
  height: cellSize,
  fontWeight: 'bold',
};

export const Cell = forwardRef<
  HTMLDivElement,
  | { empty: true; label?: never }
  | {
      empty?: never;
      reserved: true;
      label: number;
      id?: never;
      selected?: never;
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
  if (props.reserved) {
    return (
      <div
        style={{
          ...commonProps,
          margin: '-1px 0 0 -1px',
          border: '1px solid #dedede',
          backgroundColor: '#efefef',
          zIndex: 0,
        }}
      >
        {props.label}
      </div>
    );
  }
  const onClick = () => {
    if (props.setSelected) {
      props.setSelected([props.id, props.label]);
    }
  };

  const ifSelected: CSSProperties = props.selected
    ? {
        outline: 'rgb(85, 132, 149) solid 1px',
        border: 'rgb(85, 132, 149) solid 1px',
        zIndex: 10,
      }
    : {};
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
    </div>
  );
});
