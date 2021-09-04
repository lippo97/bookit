import {
  TextField as BaseTextField,
  TextFieldProps as BaseTextFieldProps,
} from '@material-ui/core';

type TextFieldProps = BaseTextFieldProps;

export const TextField = (props: TextFieldProps) => (
  <BaseTextField
    variant="outlined" //
    margin="normal"
    required
    fullWidth
    {...props}
  />
);
