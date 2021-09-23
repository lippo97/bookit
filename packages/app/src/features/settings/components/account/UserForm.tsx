import { controlledTextField } from '@/features/dashboard/components/LibraryForm/controlledTextField';
import { UserAccountRequest } from '@asw-project/shared/src/generatedTypes/requests/account';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import capitalize from 'lodash/capitalize';
import { Control, Controller, useFormState } from 'react-hook-form';
import LoadingButton from './LoadingButton';

interface UserFormProps {
  readonly control: Control<UserAccountRequest>;
  readonly onSubmit: () => void;
}

export const UserForm = ({ control, onSubmit }: UserFormProps) => {
  const { isSubmitting } = useFormState({ control });

  return (
    <form onSubmit={onSubmit} noValidate>
      <Box display="flex" flexDirection="column">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="firstName"
              render={controlledTextField({
                name: 'firstName',
                TextFieldProps: {
                  fullWidth: true,
                  id: 'firstName',
                  label: 'First name',
                },
              })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="secondName"
              render={controlledTextField({
                name: 'secondName',
                TextFieldProps: {
                  fullWidth: true,
                  id: 'secondName',
                  label: 'Second name',
                },
              })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="birthDate"
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  value={value}
                  onChange={(d) => onChange(d?.toDate())}
                  format="DD/MM/YYYY"
                  TextFieldComponent={(props) => (
                    <TextField
                      label="Birth date"
                      id="birthDate"
                      fullWidth
                      {...props}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="maleFemale"
              render={({ field, fieldState: { error } }) => (
                <FormControl component="fieldset" error={!!error}>
                  <FormLabel component="legend">Gender: </FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    {['male', 'female', 'other'].map((name) => (
                      <FormControlLabel
                        key={name}
                        value={name}
                        control={<Radio />}
                        label={capitalize(name)}
                      />
                    ))}
                  </RadioGroup>
                  <FormHelperText>{error?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <LoadingButton
              variant="contained"
              color="primary"
              fullWidth
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};
