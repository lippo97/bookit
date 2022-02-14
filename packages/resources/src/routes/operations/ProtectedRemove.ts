import { Error } from '@asw-project/shared/errors';
import { EitherAsync, Left } from 'purify-ts';
import { UnauthorizedKind } from '@asw-project/shared/errors/kinds';
import { FindByIdError, ProtectedFindByIdOptions } from './FindById';
import { HasOwner, ProtectedFindById } from './ProtectedFindById';
import { Remove } from './Remove';

type RemoveError = FindByIdError | UnauthorizedKind;

export class ProtectedRemove<T extends HasOwner>
  extends ProtectedFindById<T>
  implements Remove<T>
{
  remove(
    id: any,
    options?: ProtectedFindByIdOptions,
  ): EitherAsync<Error<RemoveError>, T> {
    const userId = options?.userId;

    return super.findById(id, options).chain((document) =>
      userId !== undefined && userId === document.ownerId?.toString()
        ? EitherAsync.fromPromise(() => document.delete())
        : EitherAsync.liftEither(
            Left({
              kind: 'UnauthorizedError',
            }),
          ),
    );
  }
}
