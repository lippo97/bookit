import { Error } from '@asw-project/shared/errors';
import { EitherAsync } from 'purify-ts';
import { UnauthorizedKind } from '@asw-project/shared/errors/kinds';
import { FindByIdError, ProtectedFindByIdOptions } from './FindById';
import { HasOwner, ProtectedFindById } from './ProtectedFindById';

import { RemoveMany } from './RemoveMany';

type RemoveError = FindByIdError | UnauthorizedKind;

export class ProtectedRemoveMany<T extends HasOwner>
  extends ProtectedFindById<T>
  implements RemoveMany<T>
{
  removeMany(
    ids: any[],
    options?: ProtectedFindByIdOptions,
  ): EitherAsync<Error<RemoveError>, any[]> {
    const results: EitherAsync<Error<RemoveError>, any>[] = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < ids.length; index++) {
      const a = super
        .findById(ids[index], options)
        .map((document) => document.delete());
      // .chain<Error<RemoveError>, any>((document) => document.delete());
      results.push(a);
    }
    const r = EitherAsync.sequence(results);
    return r;
  }
}
