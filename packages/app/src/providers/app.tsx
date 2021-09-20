import { IS_DEVELOPMENT } from '@/config';
import { queryClient } from '@/config/queryClient';
import { theme } from '@/config/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';
import DayjsUtils from '@date-io/dayjs';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <Router>{children}</Router>
        {IS_DEVELOPMENT && <ReactQueryDevtools />}
      </MuiPickersUtilsProvider>
    </QueryClientProvider>
  </ThemeProvider>
);
