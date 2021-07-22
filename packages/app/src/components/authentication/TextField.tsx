import {
  TextField as BaseTextField,
  TextFieldProps as BaseTextFieldProps,
} from '@material-ui/core';

type TextFieldProps = BaseTextFieldProps;

function TextField(props: TextFieldProps) {
  return (
    <BaseTextField
      variant="outlined" //
      margin="normal"
      required
      fullWidth
      {...props}
    />
  );
}

export default TextField;
