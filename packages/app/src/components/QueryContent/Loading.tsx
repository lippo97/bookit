import { Box, CircularProgress } from '@material-ui/core';
import { CenterContent } from './CenterContent';

export const Loading = () => (
  <CenterContent>
    <CircularProgress />
  </CenterContent>
);
