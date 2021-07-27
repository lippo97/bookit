import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { Router } from 'express';
import BaseService from './BaseService';
import { FindAll } from './operations/FindAll';

const router = Router();

function isFindAll<T extends AnyParamConstructor<any>>(
  baseService: BaseService<T>,
): baseService is FindAll<T> {
  return 'findAll' in baseService;
}

function makeRouter<T extends AnyParamConstructor<any>>(
  path: string,
  service: BaseService<T>,
) {
  if ('findAll' in service) {
    router.get(`/${path}`, (req, res, next) => {
      service.findAll;
    });
  }
}
