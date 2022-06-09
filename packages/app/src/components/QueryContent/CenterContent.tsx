import { styled } from '@material-ui/core/styles';

export const CenterContent = styled('div')(({ theme }) => ({
  flex: 1,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(2),
}));
