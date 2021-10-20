import { Layout } from '@/components/Layout';
import * as V2 from '@asw-project/shared/util/vector';
import { Vector2 } from '@asw-project/shared/util/vector';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useSeats } from '../../stores/seats';
import { Content } from './Content';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';

interface FloorMapProps {}

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '1fr auto',
    gridTemplateAreas: `
    "toolbar  sidebar"
    "content  sidebar"
    `,
  },
});

export const FloorMap = ({}: FloorMapProps) => {
  const classes = useStyles();
  const [size, setSize] = useState<Vector2>([10, 5]);
  const [selected, setSelected] = useState<readonly Vector2[]>([]);

  const handleSelect = (x: number, y: number) => setSelected([V2.make(x, y)]);

  return (
    <Layout>
      <div className={classes.root}>
        <Toolbar />
        <Sidebar />
        <Content />
      </div>
    </Layout>
  );
};
