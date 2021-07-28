// /* eslint-disable max-classes-per-file */
// /* eslint-disable class-methods-use-this */
// import { ReturnModelType, mongoose } from '@typegoose/typegoose';
// import {
//   AnyParamConstructor,
//   BeAnObject,
// } from '@typegoose/typegoose/lib/types';
// import { EitherAsync } from 'purify-ts';
// import UserModel from '../models/Authentication';
// import configureMongoose from '../config/mongoose';
// import { Remove } from './resources/operations/Remove';
// import { Create } from './resources/operations/Create';
// import { FindAll } from './resources/operations/FindAll';
// import { FindById } from './resources/operations/FindById';
// import AbstractService from './resources/AbstractService';
// import BaseService from './resources/BaseService';
// import User from '../models/Authentication';
// import { Update } from './resources/operations/Update';
// import applyMixins from './resources/applyMixins';

// class UserService extends BaseService<typeof UserModel> {
//   constructor() {
//     super(UserModel);
//   }
// }

// interface UserService
//   extends FindById<typeof User>,
//     Create<typeof User>,
//     FindAll<typeof User>,
//     Remove<typeof User>,
//     Update<typeof User> {}

// applyMixins(UserService, [FindById, Create, FindAll, Remove, Update]);

// (async () => {
//   await configureMongoose(mongoose);
//   const userService = new UserService();
//   const res = await userService.remove(30);

//   userService.create({
//     email: 'ciao',
//     password: 'ugo',
//   });

//   res
//     .ifRight((document) => {
//       console.log(document);
//     })
//     .ifLeft((err) => {
//       console.error(err);
//     });
// })();

// // class RoomService implements FindAll<Room>, FindById<Room> {
// //   findById(id: any) {
// //     return EitherAsync.liftEither(Left(''));
// //   }

// //   findAll(filters: Filters<Room>): Result<Room[]> {
// //     return EitherAsync.liftEither(Left(''));
// //   }
// // }

// // const service = new RoomService();
// // service.findAll({
// //   civicNumber: { $gte: 30 },
// // });

// // export default RoomService;
