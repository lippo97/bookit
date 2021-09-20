import { QueryStatus } from 'react-query';
import { Loading } from './Loading';
import { Retry } from './Retry';

interface QueryContentProps<T> {
  readonly status: QueryStatus;
  readonly data: T | undefined;
  readonly children: (t: T) => React.ReactNode;
  readonly retry?: () => void | Promise<any>;
}

export function QueryContent<T>({
  status,
  data,
  children,
  retry,
}: QueryContentProps<T>) {
  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error') {
    return <Retry onRetry={retry} />;
  }

  return <>{children(data!)}</>;
}
