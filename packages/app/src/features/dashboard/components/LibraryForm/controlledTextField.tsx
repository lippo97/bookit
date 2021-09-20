import { TextFieldProps } from '@material-ui/core';
import capitalize from 'lodash/fp/capitalize';
import {
  ControllerFieldState,
  ControllerRenderProps,
  Path,
  UseFormStateReturn,
} from 'react-hook-form';
import { TextField } from '../forms';

type Render<P> = {
  field: ControllerRenderProps<P, Path<P>>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<P>;
};

type Input<P> = {
  name: Path<P>;
  TextFieldProps?: Omit<TextFieldProps, 'error' | 'helperText' | 'inputRef'>;
};

// eslint-disable-next-line @typescript-eslint/no-shadow
export function controlledTextField<P>({ name, TextFieldProps }: Input<P>) {
  return ({
    field: { ref, ...inputProps },
    fieldState: { error },
  }: Render<P>) => (
    <TextField
      error={!!error}
      helperText={error?.message?.replace(`"${name}"`, capitalize(name))}
      inputRef={ref}
      {...inputProps}
      {...TextFieldProps}
    />
  );
}
