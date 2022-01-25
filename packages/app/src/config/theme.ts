import { createTheme } from '@material-ui/core/styles';
import {} from '@material-ui/core/styles/createSpacing';
import { SpeedDialActionClassKey } from '@material-ui/lab/SpeedDialAction';

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey {
    MuiSpeedDialAction: SpeedDialActionClassKey;
  }
}


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
    MuiListSubheader: {
      root: {
        fontSize: '0.9em',
      },
    },
    MuiSpeedDialAction: {
      staticTooltipLabel: {
        width: '90px',
        fontSize: '14px',
      }
    }
  },
});
