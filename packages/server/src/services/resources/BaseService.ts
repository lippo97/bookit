import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import AbstractService from './AbstractService';

export default class BaseService<
  T extends AnyParamConstructor<any>,
> extends AbstractService<T> {}
