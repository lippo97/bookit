import { useToggle } from '@/hooks/useToggle';
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { Timetable as TimetableT } from '@/lib/timetable/types';
import { LocalTime } from '@js-joda/core';
import { Timetable } from './Timetable';

interface TimetableSectionProps {
  readonly timetable: TimetableT;
  updateTimetable(timetable: TimetableT): void;
}

const useStyles = makeStyles((theme) => ({
  label: {
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  timetable: {
    marginBottom: theme.spacing(2),
  },
}));

export const TimetableSection = ({
  timetable,
  updateTimetable,
}: TimetableSectionProps) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="body2" className={classes.title}>
        Please, insert the library timetable.
      </Typography>
      <Typography variant="body2" className={classes.title}>
        Timetable is made by one or more shifts, depending on what are your
        needs.
      </Typography>

      <Timetable
        className={classes.timetable}
        timetable={timetable}
        onUpdateTimetable={updateTimetable}
      />
    </>
  );
};
