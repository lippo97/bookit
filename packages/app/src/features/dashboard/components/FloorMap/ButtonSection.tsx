import { Box, BoxProps, Typography } from '@material-ui/core';

type ButtonSectionProps = {
  readonly name: string;
  readonly children: React.ReactNode;
} & Omit<BoxProps, 'name' | 'children'>

export const ButtonSection = ({ name, children, ...boxProps }: ButtonSectionProps) => (
  <Box display="flex" flexDirection="column" mr={2} {...boxProps}>
    <Typography variant="caption">{name}</Typography>
    <Box display="flex">{children}</Box>
  </Box>
);
