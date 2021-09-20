import { styled } from '@material-ui/core/styles';
import { FormControlLabel as MuiFormControlLabel } from '@material-ui/core';

export const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
}));
