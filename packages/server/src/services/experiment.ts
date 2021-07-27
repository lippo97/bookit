/* eslint-disable no-underscore-dangle */
/* eslint-disable max-classes-per-file */

import { Maybe } from 'purify-ts';

const operations = ['findById', 'findAll', 'create', 'edit', 'remove'] as const;
type Operation = typeof operations[number];

class Service<T> {
  protected methods(): Operation[] {
    return [];
  }
}

type GConstructor<T = {}> = new (...args: any[]) => T;
type HasService = GConstructor<Service>;

function findById<TBase extends HasService>(Base: TBase) {
  return class FindById extends Base {
    public override methods(): Operation[] {
      return [...super.methods(), 'findById'];
    }

    public findById() {
      return 'findById';
    }
  };
}

function create<TBase extends HasService>(Base: TBase) {
  return class FindById extends Base {
    public override methods(): Operation[] {
      return [...super.methods(), 'create'];
    }

    public create() {
      return 'create';
    }
  };
}

type MixinF<TBase extends HasService, Res> = (Base: TBase) => {
  new (...args: any[]): Res;
  prototype: Res;
} & TBase;

type MixinRes<TBase, Res> = {
  new (...args: any[]): Res;
  prototype: Res;
} & TBase;

function mixBase<TBase extends HasService, E1>(
  Base: TBase, //
  mixin: MixinF<TBase, E1>,
): MixinRes<TBase, E1>;

function mixBase<TBase extends HasService, E1, E2>(
  Base: TBase,
  mixin1: MixinF<TBase, E1>,
  mixin2: MixinF<MixinRes<TBase, E1>, E2>,
): MixinRes<TBase, E2>;

function mixBase<TBase extends HasService, E1, E2, E3>(
  Base: TBase,
  mixin1: MixinF<TBase, E1>,
  mixin2: MixinF<MixinRes<TBase, E1>, E2>,
  mixin3: MixinF<MixinRes<TBase, E2>, E3>,
): MixinRes<TBase, E3>;

function mixBase<TBase extends HasService, E1, E2, E3>(
  Base: TBase,
  mixin1: MixinF<TBase, E1>,
  mixin2?: MixinF<MixinRes<TBase, E1>, E2>,
  mixin3?: MixinF<MixinRes<TBase, E2>, E3>,
) {
  const mixed1 = mixin1(Base);

  if (mixin2 && mixin3) {
    return mixin3(mixin2(mixed1));
  }
  if (mixin2) {
    return mixin2(mixed1);
  }

  return mixed1;
}

const Mixed = mixBase(Service, findById, create);

const model = new Mixed();
model.console.log(model.methods());
