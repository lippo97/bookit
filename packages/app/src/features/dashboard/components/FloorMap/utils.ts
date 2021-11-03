import reduce from 'lodash/reduce';
import {
  NormalizedPropertyMap,
  properties,
  PropertyMap,
} from '../../types/Property';

function merge(
  acc: PropertyMap<AggregateRowResult>,
  v: PropertyMap<boolean>,
): PropertyMap<AggregateRowResult> {
  const merged: PropertyMap<AggregateRowResult> = {};
  properties.forEach((k) => {
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

const normalize = (reduceResult: PropertyMap<AggregateRowResult>): NormalizedPropertyMap<AggregateRowResult> => ({
  "Power supply": reduceResult['Power supply'] ?? false,
  "Wi-Fi": reduceResult['Wi-Fi'] ?? false,
  Computer: reduceResult.Computer ?? false,
  Ethernet: reduceResult.Ethernet ?? false,
  Printer: reduceResult.Printer ?? false,
})

export type AggregateRowResult = boolean | 'indeterminate';

export type AggregateResult = NormalizedPropertyMap<AggregateRowResult>;

export const aggregate = (
  propertyMaps: PropertyMap<boolean>[],
): AggregateResult => {
  if (propertyMaps.length > 0) {
    const [head, ...tail] = propertyMaps;
    const reduceResult = reduce(
      tail,
      (acc, v) => merge(acc, v),
      head as PropertyMap<AggregateRowResult>,
    );
    return normalize(reduceResult);
  }
  return normalize({});
};
