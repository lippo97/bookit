import { TextField as MuiTextField } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

export const TextField = styled(MuiTextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginRight: theme.spacing(2),
}));
