import { createTheme } from '@material-ui/core/styles';
import {} from '@material-ui/core/styles/createSpacing';

export const theme = createTheme({
  props: {
    MuiTextField: {
      variant: 'outlined',
    },
    MuiTableCell: {
      align: 'center',
    },
  },

  overrides: {
    MuiStepper: {
      root: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    MuiTableCell: {
      root: {},
      head: {
        fontWeight: 'bold',
      },
    },
  },
  // palette: {
  //   primary: {
  //     main: '#ffa04d',
  //   },
  // },
});
