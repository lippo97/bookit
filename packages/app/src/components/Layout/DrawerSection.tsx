import { Box, Divider } from '@material-ui/core';

interface DrawerSectionProps {
  readonly children: React.ReactNode;
}

export const DrawerSection = ({ children }: DrawerSectionProps) => (
  <>
    <Divider />
    <Box mt={0.5} mb={0.5}>
      {children}
    </Box>
  </>
);
