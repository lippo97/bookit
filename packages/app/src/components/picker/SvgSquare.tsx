import { Vector2 } from '@asw-project/shared/util/vector';

interface SvgSquareProps {
  readonly position: Vector2;

  readonly size: number;

  readonly fill: string;

  readonly stroke: string;

  readonly strokeWidth: number;

  readonly text: string;

  onClick?(): void;
}

function SvgSquare({
  position,
  size,
  fill,
  stroke,
  strokeWidth,
  text,
  onClick,
}: SvgSquareProps) {
  const [offsetX, offsetY] = position;
  return (
    <>
      <rect
        x={offsetX}
        y={offsetY}
        width={size}
        height={size}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        onClick={(e) => {
          e.stopPropagation();
          onClick && onClick();
        }}
      />
      <text
        x={offsetX + size / 2}
        y={offsetY + size / 2}
        stroke={stroke}
        fontSize={12}
        textAnchor="middle"
        pointerEvents="none"
      >
        {text}
      </text>
    </>
  );
}

export default SvgSquare;
