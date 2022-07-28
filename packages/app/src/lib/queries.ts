import { UseQueryResult } from 'react-query';
import equals from 'lodash/fp/equals';

export function mergeQueryStatus(
  queryResults: UseQueryResult<unknown, unknown>['status'][],
): UseQueryResult['status'] {
  if (queryResults.some(equals('error'))) return 'error';
  if (queryResults.some(equals('loading'))) return 'loading';
  if (queryResults.some(equals('idle'))) return 'idle';
  return 'success';
}
