import { TextFieldProps } from '@material-ui/core';
import capitalize from 'lodash/capitalize';
import {
  useController,
  Control,
  Path,
  ControllerRenderProps,
} from 'react-hook-form';

import { TextField } from './TextField';

type ToOmit<P> =
  | 'error'
  | 'helperText'
  | 'inputRef'
  | keyof ControllerRenderProps<P, Path<P> & (string | undefined)>;

type InputProps<P> = {
  control: Control<P>;
  name: Path<P>;
} & Omit<TextFieldProps, ToOmit<P>>;

export function Input<P>({ name, control, ...textFieldProps }: InputProps<P>) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({ name, control });
  return (
    <TextField
      error={!!error}
      helperText={error?.message?.replace(`"${name}"`, capitalize(name))}
      inputRef={ref}
      {...textFieldProps}
      {...inputProps}
    />
  );
}
