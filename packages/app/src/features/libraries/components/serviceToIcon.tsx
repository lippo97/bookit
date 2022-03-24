import { Service } from '@asw-project/shared/generatedTypes';
import PowerIcon from '@material-ui/icons/Power';
import WifiIcon from '@material-ui/icons/Wifi';
import PrintIcon from '@material-ui/icons/Print';
import SettingsInputHdmiIcon from '@material-ui/icons/SettingsInputHdmi';
import ComputerIcon from '@material-ui/icons/Computer';

// eslint-disable-next-line consistent-return
export const serviceToIcon = (service: Service): React.ReactElement => {
  // eslint-disable-next-line default-case
  switch (service) {
    case 'Power supply':
      return <PowerIcon />;
    case 'Wi-Fi':
      return <WifiIcon />;
    case 'Printer':
      return <PrintIcon />;
    case 'Ethernet':
      return <SettingsInputHdmiIcon />;
    case 'Computer':
      return <ComputerIcon />;
  }
};
