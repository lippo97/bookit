import * as V2 from '@asw-project/shared/util/vector';
import { makeStyles } from '@material-ui/core';
import { boxSize } from './constants';

interface HoverProps {
  readonly position: V2.Vector2;
}

const useStyles = makeStyles({
  box: ({ scaledPosition }: { scaledPosition: V2.Vector2 }) => ({
    position: 'absolute',
    width: `${boxSize + 1}px`,
    height: `${boxSize + 1}px`,
    top: `${scaledPosition[1]}px`,
    left: `${scaledPosition[0] - 1}px`,
    background: '#ffffffaa',
    border: '1px solid #999',
    cursor: 'pointer',
    zIndex: 2,
  }),
});

export const Hover = ({ position }: HoverProps) => {
  const scaledPosition = V2.mul(position, boxSize);
  const classes = useStyles({ scaledPosition });
  return <div className={classes.box} />;
};
