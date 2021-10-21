import { Box, Typography } from '@material-ui/core';

interface ButtonSectionProps {
  readonly name: string;
  readonly children: React.ReactNode;
}

export const ButtonSection = ({ name, children }: ButtonSectionProps) => (
  <Box display="flex" flexDirection="column" mr={2}>
    <Typography variant="caption">{name}</Typography>
    <Box display="flex">{children}</Box>
  </Box>
);
