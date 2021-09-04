import { useLocation } from 'react-router-dom';

export function useQueryParams(key: string, _default: string): string {
  return new URLSearchParams(useLocation().search).get(key) || _default;
}
