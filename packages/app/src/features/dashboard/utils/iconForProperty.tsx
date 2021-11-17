/* eslint-disable-next-line consistent-return */
import { Service } from '@asw-project/shared/generatedTypes';
import ComputerIcon from '@material-ui/icons/Computer';
import PowerIcon from '@material-ui/icons/Power';
import PrintIcon from '@material-ui/icons/Print';
import SettingsInputHdmiIcon from '@material-ui/icons/SettingsInputHdmi';
import WifiIcon from '@material-ui/icons/Wifi';
import { CSSProperties } from "react";

export const iconForService = (
  property: Service,
  style?: CSSProperties,
): React.ReactNode => {
  switch (property) {
    case 'Wi-Fi':
      return <WifiIcon style={style} />;
    case 'Computer':
      return <ComputerIcon style={style} />;
    case 'Power supply':
      return <PowerIcon style={style} />;
    case 'Ethernet':
      return <SettingsInputHdmiIcon style={style} />;
    case 'Printer':
      return <PrintIcon style={style} />;
  }
};
