import React from 'react';

interface GridProps {
  readonly size: number;
}

const Grid = ({ size }: GridProps) => (
  <>
    <defs>
      <pattern
        id="smallGrid"
        width={size}
        height={size}
        patternUnits="userSpaceOnUse"
      >
        <path
          d={`M ${size} 0 L 0 0 0 ${size}`}
          fill="none"
          stroke="gray"
          strokeWidth="0.5"
        />
      </pattern>
      <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect width="100" height="100" fill="url(#smallGrid)" />
        <path
          d="M 100 0 L 0 0 0 100"
          fill="none"
          stroke="gray"
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#smallGrid)" pointerEvents="none" />
  </>
);

export default React.memo(Grid);
