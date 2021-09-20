import { Timetable as TimetableT } from '@/lib/timetable/types';
import {
  Checkbox,
  Link,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormControlLabel } from '../forms';
import { TimetableSection } from '../TimetableSection';
import { controlledTextField } from './controlledTextField';
import { StepperActions } from './StepperActions';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  stepTitle: {
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    '& > *': {
      marginLeft: theme.spacing(1),
    },
  },
}));

export interface LibraryFormValue {
  readonly name: string;
  readonly street: string;
  readonly city: string;
  readonly isTermAccepted?: boolean;
}

interface LibraryFormProps {
  readonly formControl: Control<LibraryFormValue>;
  readonly timetable: TimetableT;
  updateTimetable(timetable: TimetableT): void;
}

export const LibraryForm = ({
  formControl,
  timetable,
  updateTimetable,
}: LibraryFormProps) => {
  const classes = useStyles();
  const [step, setStep] = useState(0);

  const handleNext = () => setStep((s) => (s + 1) % 3);
  const handleBack = () => setStep((s) => (3 + s - 1) % 3);
  const MyStepperActions = (
    props: Omit<
      React.ComponentProps<typeof StepperActions>,
      'onBack' | 'onNext'
    >,
  ) => <StepperActions onBack={handleBack} onNext={handleNext} {...props} />;

  const stepContent: {
    label: string;
    content: React.ReactNode;
  }[] = [
    {
      label: 'Basic information',
      content: (
        <>
          <Typography className={classes.stepTitle} variant="body2">
            Please, provide basic information of the library.
          </Typography>
          <Controller
            control={formControl}
            name="name"
            render={controlledTextField({
              name: 'name',
              TextFieldProps: {
                required: true,
                label: 'Name',
              },
            })}
          />
          <Controller
            control={formControl}
            name="street"
            render={controlledTextField({
              name: 'street',
              TextFieldProps: {
                required: true,
                label: 'Street',
              },
            })}
          />
          <Controller
            control={formControl}
            name="city"
            render={controlledTextField({
              name: 'city',
              TextFieldProps: {
                required: true,
                label: 'City',
              },
            })}
          />
          <MyStepperActions disabledBack disabledNext={false} />
        </>
      ),
    },
    {
      label: 'Timetable',
      content: (
        <>
          <TimetableSection
            timetable={timetable}
            updateTimetable={updateTimetable}
          />
          <MyStepperActions />
        </>
      ),
    },
    {
      label: 'Finalize',
      content: (
        <>
          <Controller
            control={formControl}
            name="isTermAccepted"
            render={({ field: { value, ...rest } }) => (
              <>
                <FormControlLabel
                  control={
                    <Checkbox color="primary" checked={value} {...rest} />
                  }
                  label={
                    <Typography variant="body2">
                      I confirm that I have read the{' '}
                      <Link
                        href="https://www.termsandcondiitionssample.com/live.php?token=FYehkAO7UIdPZdFxzLtvsL2fI6nIIG8c"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms
                      </Link>
                      . *
                    </Typography>
                  }
                />
                <MyStepperActions
                  nextButtonText="Create"
                  disabledNext={!value}
                />
              </>
            )}
          />
        </>
      ),
    },
  ];

  return (
    <Stepper activeStep={step} orientation="vertical">
      {stepContent.map(({ label, content }) => (
        <Step key={label}>
          <StepLabel>
            <Typography variant="body1">{label}</Typography>
          </StepLabel>
          <StepContent>
            <>{content}</>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
};
