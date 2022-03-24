import { Library } from '@asw-project/shared/generatedTypes';
import PlaceIcon from '@material-ui/icons/Place';
import { Button, Chip, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { LibraryTimetable as Timetable } from './LibraryTimetable';
import { serviceToIcon } from './serviceToIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: theme.spacing(2),
    },
    '& > *:first-child': {
      marginTop: theme.spacing(2),
    },
  },
  placeIcon: {
    fontSize: '18px',
  },
  spacing: {
    '& > *': {
      margin: theme.spacing(1, 0),
    },
    '& > *:last-child': {
      margin: theme.spacing(0, 0),
    },
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
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
  data: { name, city, street, availableServices, timetable },
}: LibraryDataProps) => {
  const classes = useStyles();
  const navigate = useNavigate();
  availableServices.push('Power supply', 'Wi-Fi', 'Printer');

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.spacing}>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="body1">
            <PlaceIcon className={classes.placeIcon} />
            {` ${street}, ${city}`}
          </Typography>
          <div className={classes.chips}>
            {availableServices.map((s) => (
              <Chip
                color="primary"
                size="small"
                label={s}
                icon={serviceToIcon(s)}
              />
            ))}
          </div>
        </div>
        <div>
          <Typography align="center" variant="h5">
            Timetable
          </Typography>
          <Timetable data={timetable} />
        </div>
        <Button variant="outlined" onClick={() => navigate('reservation/date')}>
          Book a seat
        </Button>
      </div>
    </Container>
  );
};
