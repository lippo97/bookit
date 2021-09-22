/* eslint-disable no-sparse-arrays */
import { Timetable as TimetableT } from '@/lib/timetable/types';
import { Library } from '@asw-project/shared/generatedTypes/library';
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
import { values } from 'lodash';
import capitalize from 'lodash/capitalize';
import React, { useState } from 'react';
import { Control, Controller, useWatch } from 'react-hook-form';
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
  readonly basicInfo: {
    readonly name: string;
    readonly street: string;
    readonly city: string;
  };
  /* Pick<
    Library,
    'availableServices' | 'city' | 'imageFilename' | 'name' | 'rooms' | 'street'>
    // | 'timetable' */

  readonly isTermAccepted?: boolean;
}

interface LibraryFormProps {
  readonly formControl: Control<LibraryFormValue>;
  readonly timetable: TimetableT;
  readonly mode: 'create' | 'edit';
  updateTimetable(timetable: TimetableT): void;
  onSubmit(): void;
}

export const LibraryForm = ({
  mode,
  formControl,
  timetable,
  updateTimetable,
  onSubmit,
}: LibraryFormProps) => {
  const classes = useStyles();
  const [step, setStep] = useState(0);

  const handleNext = () => setStep((s) => (s + 1) % 3);
  const handleBack = () => setStep((s) => (3 + s - 1) % 3);
  const { basicInfo } = useWatch({ control: formControl });
  const MyStepperActions = ({
    onBack,
    onNext,
    ...props
  }: React.ComponentProps<typeof StepperActions>) => (
    <StepperActions
      onBack={onBack ?? handleBack}
      onNext={onNext ?? handleNext}
      {...props}
    />
  );

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
            name="basicInfo.name"
            render={controlledTextField({
              name: 'basicInfo.name',
              TextFieldProps: {
                required: true,
                label: 'Name',
              },
            })}
          />
          <Controller
            control={formControl}
            name="basicInfo.street"
            render={controlledTextField({
              name: 'basicInfo.street',
              TextFieldProps: {
                required: true,
                label: 'Street',
              },
            })}
          />
          <Controller
            control={formControl}
            name="basicInfo.city"
            render={controlledTextField({
              name: 'basicInfo.city',
              TextFieldProps: {
                required: true,
                label: 'City',
              },
            })}
          />
          <MyStepperActions
            disabledBack
            disabledNext={!values(basicInfo).every((x) => x.length > 0)}
          />
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
          <MyStepperActions onNext={mode === 'edit' ? onSubmit : undefined} />
        </>
      ),
    },
  ].concat(
    mode === 'create'
      ? {
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
                      nextButtonText={capitalize(mode)}
                      disabledNext={!value}
                      onNext={onSubmit}
                    />
                  </>
                )}
              />
            </>
          ),
        }
      : [],
  );

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
