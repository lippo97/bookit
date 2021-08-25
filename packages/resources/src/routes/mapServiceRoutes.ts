import { NextFunction, Request, Response, Router } from 'express';
import pick from 'lodash/pick';
import { EitherAsync } from 'purify-ts';
import { BaseService } from './BaseService';
import { Create, Remove, Update } from './operations';
import { FindAll } from './operations/FindAll';
import { FindById } from './operations/FindById';

type WithId = {
  id: any;
};

function isFindAll<T>(service: BaseService<T>): service is FindAll<T> {
  return 'findAll' in service;
}

function isFindById<T>(service: BaseService<T>): service is FindById<T> {
  return 'findById' in service;
}

function isCreate<T>(service: BaseService<T>): service is Create<T> {
  return 'create' in service;
}
function isUpdate<T>(service: BaseService<T>): service is Update<T> {
  return 'update' in service;
}

function isRemove<T>(service: BaseService<T>): service is Remove<T> {
  return 'remove' in service;
}

function handleResult(res: Response, next: NextFunction) {
  return async <L, R>(result: EitherAsync<L, R>) => {
    (await result).caseOf({
      Right: (documents) => res.json(documents),
      Left: next,
    });
  };
}

function getUserId(session: any): string | undefined {
  if (session.userId !== undefined) {
    return session.userId;
  }
  return undefined;
}

export function mapServiceRoutes<TConstructor>(
  service: BaseService<TConstructor>,
  keys: string[],
) {
  return (router: Router) => {
    const rootPath = '';
    const idPath = `${rootPath}/:id`;

    if (isFindAll(service)) {
      router.get(rootPath, (req, res, next) => {
        // Coulnd't find a better way to type this,
        // so we'll stick with any.
        const filters = pick(req.query, keys) as any;
        const result = service.findAll(filters);
        handleResult(res, next)(result);
      });
    }

    if (isFindById(service)) {
      router.get(idPath, (req: Request<WithId>, res, next) => {
        const userId = getUserId(req.session);
        const result = service.findById(req.params.id, { userId });
        handleResult(res, next)(result);
      });
    }

    if (isCreate(service)) {
      router.post(rootPath, (req, res, next) => {
        const userId = getUserId(req.session);
        const fields = pick(req.body, keys) as any;
        const result = service.create(fields, { userId });
        handleResult(res, next)(result);
      });
    }

    if (isUpdate(service)) {
      router.put(idPath, (req: Request<WithId>, res, next) => {
        const userId = getUserId(req.session);
        const fields = pick(req.body, keys) as any;
        const result = service.update(req.params.id, fields, {
          userId,
        });
        handleResult(res, next)(result);
      });
    }

    if (isRemove(service)) {
      router.delete(idPath, (req: Request<WithId>, res, next) => {
        const userId = getUserId(req.session);
        const result = service.remove(req.params.id, {
          userId,
        });
        handleResult(res, next)(result);
      });
    }
  };
}
