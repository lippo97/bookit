import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { IS_DEVELOPMENT } from '@/config';
import { queryClient } from '@/config/queryClient';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => (
  <QueryClientProvider client={queryClient}>
    <Router>{children}</Router>
    {IS_DEVELOPMENT && <ReactQueryDevtools />}
  </QueryClientProvider>
);
