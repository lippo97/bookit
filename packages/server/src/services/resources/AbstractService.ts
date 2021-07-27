import { ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor, BeAnObject } from '@typegoose/typegoose/lib/types';

export default abstract class AbstractService<T extends AnyParamConstructor<any>> {
  constructor(protected model: ReturnModelType<T, BeAnObject>) {}
}
