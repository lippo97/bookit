import { services } from '@asw-project/shared/types/services';
import reduce from 'lodash/reduce';
import {
  NormalizedServiceMap,
  ServiceMap,
} from '../../types/ServiceMap';

function merge(
  acc: ServiceMap<AggregateRowResult>,
  v: ServiceMap<boolean>,
): ServiceMap<AggregateRowResult> {
  const merged: ServiceMap<AggregateRowResult> = {};
  services.forEach((k) => {
    const oldValue = acc[k] ?? false;
    const newValue = v[k] ?? false;
    if (oldValue === 'indeterminate' || oldValue !== newValue) {
      merged[k] = 'indeterminate';
    } else {
      merged[k] = oldValue && newValue;
    }
  });
  return merged;
}

const normalize = (reduceResult: ServiceMap<AggregateRowResult>): NormalizedServiceMap<AggregateRowResult> => ({
  "Power supply": reduceResult['Power supply'] ?? false,
  "Wi-Fi": reduceResult['Wi-Fi'] ?? false,
  Computer: reduceResult.Computer ?? false,
  Ethernet: reduceResult.Ethernet ?? false,
  Printer: reduceResult.Printer ?? false,
})

export type AggregateRowResult = boolean | 'indeterminate';

export type AggregateResult = NormalizedServiceMap<AggregateRowResult>;

export const aggregate = (
  propertyMaps: ServiceMap<boolean>[],
): AggregateResult => {
  if (propertyMaps.length > 0) {
    const [head, ...tail] = propertyMaps;
    const reduceResult = reduce(
      tail,
      (acc, v) => merge(acc, v),
      head as ServiceMap<AggregateRowResult>,
    );
    return normalize(reduceResult);
  }
  return normalize({});
};
