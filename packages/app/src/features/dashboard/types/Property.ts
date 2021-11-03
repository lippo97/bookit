export const properties = [
  'Ethernet',
  'Wi-Fi',
  'Computer',
  'Power supply',
  'Printer',
] as const;

export type Property = typeof properties[number];

export type PropertyMap<T> = {
  [k in Property]?: T;
};

export type NormalizedPropertyMap<T> = Required<PropertyMap<T>>
