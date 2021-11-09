import { useMediaQuery, useTheme } from '@material-ui/core';

export const useMobile = () => {
  const { breakpoints } = useTheme();
  return useMediaQuery(`(max-width: ${breakpoints.values.md}px)`);
}
