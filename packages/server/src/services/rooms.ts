/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
import { tSTupleType } from '@babel/types';
import { ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor, BeAnObject } from '@typegoose/typegoose/lib/types';
import { CreateQuery, FilterQuery } from 'mongoose';
import { EitherAsync, Left, MaybeAsync } from 'purify-ts';
import User from '../models/User';

type DbError = '';
type Result<T> = EitherAsync<DbError, T>;
interface Room {
  address: string;
  civicNumber: number;
  name: string;
  owner: string;
}

type Filters<T> = FilterQuery<T>;

const user = new User();

interface FindAll<T> {
  findAll(filters: Filters<T>): Result<T[]>;
}

interface FindById<T> {
  findById(id: any): Result<T>;
}

abstract class UserServiceBase<T extends AnyParamConstructor<any>> {
  methods: string[] = [];

  constructor(protected model: ReturnModelType<T, BeAnObject>) {}
}

class MyService<T extends AnyParamConstructor<any>> extends UserServiceBase<T> {}

class FindById2<T extends AnyParamConstructor<any>> extends UserServiceBase<T> {
  findById(id: any): Result<T> {
    return MaybeAsync(() => this.model.findById(id))
      .filter((u) => u !== null)
      .map((u) => u!)
      .toEitherAsync('');
  }
}

class Create2<T extends AnyParamConstructor<any>> extends UserServiceBase<T> {
  override methods(): string[] {
    return [...super.methods(), 'create'];
  }

  create(query: CreateQuery<T>): Result<T> {
    return EitherAsync(() => this.model.create(query));
  }
}

interface MyService<T> extends Create2<T>, FindById2<T> {}

function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null),
      );
    });
  });
}

applyMixins(MyService, [Create2, FindById2]);

const userService = new MyService<typeof User>(User);
const res = userService.findById(30);
console.log(userService.methods());
console.log(res);

// class RoomService implements FindAll<Room>, FindById<Room> {
//   findById(id: any) {
//     return EitherAsync.liftEither(Left(''));
//   }

//   findAll(filters: Filters<Room>): Result<Room[]> {
//     return EitherAsync.liftEither(Left(''));
//   }
// }

// const service = new RoomService();
// service.findAll({
//   civicNumber: { $gte: 30 },
// });

// export default RoomService;
