import { Library } from '@asw-project/shared/generatedTypes';
import { makeStyles } from '@material-ui/core';
import dayjs from 'dayjs';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

type Timetable = Library['timetable'];
type Entry = Timetable[0];

interface LibraryTimetableProps {
  readonly data: Library['timetable'];
}

const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%',
    maxWidth: '600px',
    textAlign: 'center',
    verticalAlign: 'middle',
    marginTop: theme.spacing(1),
    '& td': {
      padding: theme.spacing(1.5, 0),
      fontSize: '14px',
    },
  },
}));

const renderEntry = ({ slot: { from, to }, days }: Entry) => {
  const fFrom = dayjs(from).format('HH:mm');
  const fTo = dayjs(to).format('HH:mm');
  const header = (
    <th key="header">
      <div>{fFrom}</div>
      <div>{fTo}</div>
    </th>
  );

  const tds = [...Array(7)]
    .map((_, i) =>
      days.includes(i) ? <CheckCircleIcon color="primary" /> : <></>,
    )
    .map((html, i) => <td key={i}>{html}</td>);

  return [header, ...tds];
};

export const LibraryTimetable = ({ data }: LibraryTimetableProps) => {
  const classes = useStyles();
  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <td />
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
        {data.map(renderEntry).map((x, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <tr key={i}>{x}</tr>
        ))}
      </tbody>
    </table>
  );
};
