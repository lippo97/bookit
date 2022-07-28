import { Box } from '@material-ui/core';
import { AppBar, AppBarProps } from './AppBar';

interface StepLayoutProps extends AppBarProps {
  readonly children: React.ReactNode;
}

export const StepLayout: React.FC<StepLayoutProps> = ({
  children,
  ...appBarProps
}) => (
  <Box
    position="relative"
    minHeight="100vh"
    display="flex"
    flexDirection="column"
  >
    <AppBar {...appBarProps} />
    <Box flex="1" paddingBottom={2} display="flex" flexDirection="column">
      {children}
    </Box>
  </Box>
);