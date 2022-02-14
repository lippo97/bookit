import { Box, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { Control, Controller } from 'react-hook-form';
import { controlledTextField } from '../LibraryForm/controlledTextField';

export interface RoomFormValue {
  // readonly libraryId: string;
  readonly name: string;
  readonly accessibility: boolean;
}
interface RoomFormProps {
  readonly formControl: Control<RoomFormValue>;
  readonly buttonText: string;
  onBack(): void;
  onSubmit(): void;
}

export function RoomForm({
  formControl,
  onBack,
  onSubmit,
  buttonText,
}: RoomFormProps) {
  return (
    <Box
      mt={2}
      flex={1}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
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
        name="accessibility"
        render={({ field: { value, ...rest } }) => (
          <FormControlLabel
            label="Accessibility"
            control={<Checkbox color="primary" {...rest} checked={value} />}
          />
        )}
      />
      <Box display="flex" flexDirection="row" justifyContent="right">
        <Box mr={1}>
          <Button
            onClick={onBack}
            size="medium"
            variant="text"
            color="secondary"
          >
            Cancel
          </Button>
        </Box>
        <Button
          disabled={!formControl.formStateRef.current.errors}
          size="medium"
          variant="outlined"
          color="primary"
          onClick={onSubmit}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
}

export default RoomForm;
