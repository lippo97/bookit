import { Layout } from '@/components/Layout';
import { Tuple } from '@asw-project/shared/util/tuples';
import { Vector2 } from '@asw-project/shared/util/vector';
import * as V2 from '@asw-project/shared/util/vector';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { Content } from './Content';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';
import { Seat, SparseMatrix } from './types';

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
  const [seats, setSeats] = useState<SparseMatrix<Seat>>([[], [], []]);
  const [size, setSize] = useState<Tuple<number, number>>([10, 5]);
  const [selected, setSelected] = useState<readonly Vector2[]>([]);

  const handleSelect = (x: number, y: number) => setSelected([V2.make(x, y)]);

  /* eslint-disable no-sparse-arrays */
  useEffect(() => {
    setSeats([
      [
        {
          id: 6,
          services: ['Wi-Fi'],
        },
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        {
          id: 5,
          services: ['Accessibility'],
        },
      ],
      [
        ,
        {
          id: 1,
          services: ['Wi-Fi'],
        },
        {
          id: 2,
          services: ['Wi-Fi'],
        },
        {
          id: 3,
          services: ['Wi-Fi'],
        },
      ],
      [
        ,
        {
          id: 4,
          services: ['Wi-Fi'],
        },
      ],
      [],
      [
        {
          id: 8,
          services: ['PC'],
        },
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        { id: 9, services: ['Power Supply'] },
      ],
    ]);
  }, [setSeats]);

  return (
    <Layout>
      <div className={classes.root}>
        <Toolbar />
        <Sidebar seats={seats} selected={selected} />
        <Content
          seats={seats}
          size={size}
          selected={selected}
          handleSelect={handleSelect}
        />
      </div>
    </Layout>
  );
};
