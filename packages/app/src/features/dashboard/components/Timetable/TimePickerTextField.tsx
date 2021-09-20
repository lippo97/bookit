import { Box, InputBase, TextField, TextFieldProps } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';

type TimePickerTextFieldProps = Pick<
  React.PropsWithoutRef<TextFieldProps>,
  'InputProps' | 'onClick' | 'onKeyDown' | 'value'
>;

const Input = styled(InputBase)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
  display: 'flex',
  justifyContent: 'center',
  background: theme.palette.action.hover,
}));

const input = styled('input')(({ theme }) => ({
  textAlign: 'center',
}));

export const TimePickerTextField = ({
  value,
  InputProps,
  onClick,
  onKeyDown,
}: TimePickerTextFieldProps) => {
  // eslint-disable-next-line react/prop-types
  const readOnly = InputProps?.readOnly ?? false;
  return (
    <Box minWidth="90px" onClick={onClick} onKeyDown={onKeyDown}>
      <Input value={value} readOnly={readOnly} inputComponent={input} />
    </Box>
  );
};
