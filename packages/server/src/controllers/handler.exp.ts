import { Request, Response } from 'express';
import { Either, Maybe } from 'purify-ts';

export interface Handler<I, O> {
  (i: I): Promise<O>;
}

export function wrap<I, O>(
  handler: Handler<I, O>,
): (req: Request<any, any, I>, res: Response<O>) => PromiseLike<Response | void> {
  return (req, res) => handler(req.body).then(res.json);
}

export function wrapMaybe<I, T>(
  handler: Handler<I, Maybe<T>>,
): (req: Request<any, any, I>, res: Response<T | null>) => PromiseLike<Response | void> {
  return (req, res) =>
    handler(req.body).then((o) =>
      o.caseOf({
        Just: res.status(200).json,
        Nothing: () => res.sendStatus(400),
      }),
    );
}

export function wrapEither<I, L, R>(
  handler: Handler<I, Either<L, R>>,
): (req: Request<any, any, I>, res: Response<L | R>) => PromiseLike<Response | void> {
  return (req, res) =>
    handler(req.body).then((e) =>
      e.caseOf({
        Left: res.status(400).json,
        Right: res.status(200).json,
      }),
    );
}
