import { Service } from "@asw-project/shared/generatedTypes";

export type ServiceMap<T> = {
  [k in Service]?: T;
};

export type NormalizedServiceMap<T> = Required<ServiceMap<T>>
