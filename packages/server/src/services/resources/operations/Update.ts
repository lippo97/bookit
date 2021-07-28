import { Error } from '@asw-project/shared/errors';
import {
  AnyParamConstructor,
  DocumentType,
} from '@typegoose/typegoose/lib/types';
import { UpdateQuery } from 'mongoose';
import { EitherAsync } from 'purify-ts';
import { DocumentCreationError, handleCreationError } from './documentCreation';
import { definedOrNotFound } from './documentFind';
import { FindById, FindByIdError } from './FindById';

type EditError = DocumentCreationError | FindByIdError;

export class Update<T extends AnyParamConstructor<any>> extends FindById<T> {
  update(
    id: any,
    update: UpdateQuery<DocumentType<InstanceType<T>>>,
  ): EitherAsync<Error<EditError>, DocumentType<InstanceType<T>>> {
    return EitherAsync(() => this.model.findByIdAndUpdate(id, update)) //
      .mapLeft(handleCreationError)
      .chain(definedOrNotFound);
  }
}
