import { Library } from '@asw-project/shared/generatedTypes';
import PlaceIcon from '@material-ui/icons/Place';
import PowerIcon from '@material-ui/icons/Power';
import WifiIcon from '@material-ui/icons/Wifi';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import { Chip, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LibraryTimetable as Timetable } from './LibraryTimetable';

const timetableData = [
  [
    {
      from: 8,
      to: 12,
    },
    {
      from: 14,
      to: 19,
    },
  ],
  [
    {
      from: 8,
      to: 12,
    },
    {
      from: 14,
      to: 19,
    },
  ],
  [
    {
      from: 8,
      to: 12,
    },
    {
      from: 14,
      to: 19,
    },
  ],
  [
    {
      from: 8,
      to: 12,
    },
    {
      from: 14,
      to: 19,
    },
  ],
  [
    null,
    {
      from: 14,
      to: 19,
    },
  ],
  [
    {
      from: 8,
      to: 12,
    },
    {
      from: 14,
      to: 19,
    },
  ],
  [
    {
      from: 8,
      to: 12,
    },
    {
      from: 14,
      to: 19,
    },
  ],
] as any;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    margin: theme.spacing(2),
    fontWeight: 'bold',
    width: '60%',
  },
  info: {
    marginBottom: theme.spacing(2),
  },
  placeIcon: {
    fontSize: '18px',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
    maxWidth: '60%',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

interface LibraryDataProps {
  data: Library;
}

export const LibraryData = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  data: { name, city, street, availableServices, rooms, timetable },
}: LibraryDataProps) => {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.root}>
        <Typography align="center" variant="h4" className={classes.title}>
          {name}
        </Typography>
        <Typography align="center" variant="body1" className={classes.info}>
          <PlaceIcon className={classes.placeIcon} />
          {` ${street}, ${city}`}
        </Typography>
        <div className={classes.chips}>
          <Chip
            color="primary"
            size="small"
            label="Power source"
            icon={<PowerIcon />}
          />
          <Chip
            color="primary"
            size="small"
            label="Wi-Fi"
            icon={<WifiIcon />}
          />
          <Chip
            color="primary"
            size="small"
            label="Accessibility"
            icon={<AccessibilityIcon />}
          />
        </div>
        <Typography align="center" variant="h5" className={classes.info}>
          Timetable
        </Typography>
        <Timetable data={timetableData} />
      </div>
    </Container>
  );
};
