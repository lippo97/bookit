import { Box } from '@material-ui/core';
import { AppBar, AppBarProps } from './AppBar';
import { ProminentAppBar } from './ProminentAppBar';

interface ClassicAppBar {
  readonly prominent?: never;
  readonly transparent?: never;
  readonly appBarImage?: never;
}

interface TransparentBarProps {
  readonly prominent?: never;
  readonly transparent: true;
  readonly appBarImage?: never;
}

interface ProminentBarProps {
  readonly prominent: true;
  readonly transparent?: never;
  readonly appBarImage?: string;
}

type StepLayoutProps = {
  readonly children: React.ReactNode;
} & AppBarProps &
  (ProminentBarProps | TransparentBarProps | ClassicAppBar);

export const StepLayout: React.FC<StepLayoutProps> = ({
  children,
  appBarImage,
  prominent,
  transparent,
  ...appBarProps
}) => {
  const SelectAppBar = () => {
    if (transparent) {
      return <AppBar {...appBarProps} transparent />;
    }
    if (prominent) {
      return <ProminentAppBar {...appBarProps} image={appBarImage} />;
    }
    return <AppBar {...appBarProps} />;
  };
  return (
    <Box
      position="relative"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
    >
      <SelectAppBar />
      <Box flex="1" paddingBottom={2} display="flex" flexDirection="column">
        {children}
      </Box>
    </Box>
  );
};
