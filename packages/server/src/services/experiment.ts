/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

import { BeAnObject, ReturnModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { CreateQuery, FilterQuery, QueryFindOptions } from 'mongoose';
import { mongoose } from '@typegoose/typegoose';
import { EitherAsync } from 'purify-ts';
import { UnexpectedError } from '@asw-project/shared/errors';
import UserModel from '../models/User';
import configureMongoose from '../config/mongoose';

const operations = ['findById', 'findAll', 'create', 'edit', 'remove'] as const;
type Operation = typeof operations[number];

type Constructor<T = {}> = new (...args: any[]) => T;

type AnyConstructor = Constructor<any>;
type Model<T extends AnyConstructor> = ReturnModelType<T, BeAnObject>;
type Result<T> = EitherAsync<UnexpectedError, T>;

class Service<T> {
  constructor(protected model: Model<Constructor<T>>) {}

  protected methods(): Operation[] {
    return [];
  }
}

type HasService<T> = Constructor<Service<T>>;

function findById<T, TBase extends HasService<T>>(Base: TBase) {
  return class FindById extends Base {
    public override methods(): Operation[] {
      return [...super.methods(), 'findById'];
    }

    public findById(id: any) {
      return this.model.findById(id);
    }
  };
}

function create<T, TBase extends HasService<T>>(Base: TBase) {
  return class FindById extends Base {
    public override methods(): Operation[] {
      return [...super.methods(), 'create'];
    }

    public create(createQuery: CreateQuery<T>) {
      return this.model.create(createQuery);
    }
  };
}

function findAll<T, TBase extends HasService<T>>(Base: TBase) {
  return class FindAll extends Base {
    public override methods(): Operation[] {
      return [...super.methods(), 'findAll'];
    }

    public findAll(
      filterQuery: FilterQuery<DocumentType<T>>,
      projection?: any | null,
      options?: QueryFindOptions,
    ) {
      return EitherAsync(() => this.model.find(filterQuery, projection, options))
        .map((res) => res)
        .mapLeft((err: any) => ({
          body: err,
          kind: 'InternalError',
        }));
    }
  };
}

type MixinF<T, TBase extends HasService<T>, Res> = (Base: TBase) => {
  new (...args: any[]): Res;
  prototype: Res;
} & TBase;

type MixinRes<TBase, Res> = {
  new (...args: any[]): Res;
  prototype: Res;
} & TBase;

function mixBase<T, TBase extends HasService<T>, E1>(
  Base: TBase, //
  mixin: MixinF<T, TBase, E1>,
): MixinRes<TBase, E1>;

function mixBase<T, TBase extends HasService<T>, E1, E2>(
  Base: TBase,
  mixin1: MixinF<T, TBase, E1>,
  mixin2: MixinF<T, MixinRes<TBase, E1>, E2>,
): MixinRes<TBase, E2>;

function mixBase<T, TBase extends HasService<T>, E1, E2, E3>(
  Base: TBase,
  mixin1: MixinF<T, TBase, E1>,
  mixin2: MixinF<T, MixinRes<TBase, E1>, E2>,
  mixin3: MixinF<T, MixinRes<TBase, E2>, E3>,
): MixinRes<TBase, E3>;

function mixBase<T, TBase extends HasService<T>, E1, E2, E3, E4>(
  Base: TBase,
  mixin1: MixinF<T, TBase, E1>,
  mixin2: MixinF<T, MixinRes<TBase, E1>, E2>,
  mixin3: MixinF<T, MixinRes<TBase, E2>, E3>,
  mixin4: MixinF<T, MixinRes<TBase, E3>, E4>,
): MixinRes<TBase, E4>;

function mixBase<T, TBase extends HasService<T>, E1, E2, E3, E4>(
  Base: TBase,
  mixin1: MixinF<T, TBase, E1>,
  mixin2?: MixinF<T, MixinRes<TBase, E1>, E2>,
  mixin3?: MixinF<T, MixinRes<TBase, E2>, E3>,
  mixin4?: MixinF<T, MixinRes<TBase, E3>, E4>,
) {
  const mixed1 = mixin1(Base);

  if (mixin2 && mixin3 && mixin4) {
    return mixin4(mixin3(mixin2(mixed1)));
  }
  if (mixin2 && mixin3) {
    return mixin3(mixin2(mixed1));
  }
  if (mixin2) {
    return mixin2(mixed1);
  }

  return mixed1;
}

const Mixed = mixBase(Service, findById, create, findAll);

(async () => {
  console.log('experiment');
  const model = new Mixed(UserModel);
  await configureMongoose(mongoose);
  const res = await model.findAll({});
  console.log(res);
})();
