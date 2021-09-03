// import {} from '@asw-project/shared/
import { fst, snd } from '@asw-project/shared/util/tuples';
import { makeStyles } from '@material-ui/core';

type Slot = { from: number; to: number } | null;

type Day = [Slot, Slot];

type ComplexSlot = [Day, Day, Day, Day, Day, Day, Day];

type Timetable = ComplexSlot;

interface LibraryTimetableProps {
  readonly data: Timetable;
}

const renderSlot = (slot: Slot) => (
  <td>{slot ? `${slot.from} - ${slot.to}` : '-'}</td>
);

const renderFirstSlot = (timetable: Timetable) =>
  timetable.map(fst).map(renderSlot);

const renderSecondSlot = (timetable: Timetable) =>
  timetable.map(snd).map(renderSlot);

const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%',
    maxWidth: '600px',
    textAlign: 'center',
    verticalAlign: 'middle',
    '& td': {
      paddingTop: theme.spacing(1),
      fontSize: '14px',
    },
  },
}));

export const LibraryTimetable = ({ data }: LibraryTimetableProps) => {
  const classes = useStyles();
  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
          <th>Sun</th>
        </tr>
      </thead>
      <tbody>
        <tr>{renderFirstSlot(data)}</tr>
        <tr>{renderSecondSlot(data)}</tr>
      </tbody>
    </table>
  );
};
