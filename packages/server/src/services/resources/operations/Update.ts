import { Error, unexpectedError } from '@asw-project/shared/errors';
import {
  AnyParamConstructor,
  DocumentType,
} from '@typegoose/typegoose/lib/types';
import { UpdateQuery } from 'mongoose';
import { EitherAsync } from 'purify-ts';
import { DocumentCreationError, handleCreationError } from './documentCreation';
import { FindById, FindByIdError } from './FindById';

type EditError = DocumentCreationError | FindByIdError;

export class Update<T extends AnyParamConstructor<any>> extends FindById<T> {
  update(id: any, update: UpdateQuery<T>): EitherAsync<Error<EditError>, void> {
    function updateDocument(
      document: DocumentType<T>, // ciao
    ): EitherAsync<Error<DocumentCreationError>, void> {
      return EitherAsync(() => document.update(update).exec()) //
        .mapLeft(handleCreationError);
    }

    return this.findById(id).chain(updateDocument);
  }
}
