import { Layout } from '@/components/Layout';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { SeatMap, useSeats } from '../../stores/seats';
import { Content } from './Content';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';

interface FloorMapProps {
  readonly initialSeats?: SeatMap;
}

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

export const FloorMap = ({initialSeats}: FloorMapProps) => {
  const classes = useStyles();
  const initialize = useSeats((s) => s.initialize)

  useEffect(() => {
    if (initialSeats !== undefined) {
      initialize(initialSeats);
    }
  } , [initialSeats])

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
