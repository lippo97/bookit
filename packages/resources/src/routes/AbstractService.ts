import { Model, Document } from 'mongoose';

export abstract class AbstractService<T> {
  constructor(protected model: Model<T & Document>) {}

  getModelName() {
    return this.model.modelName;
  }
}
