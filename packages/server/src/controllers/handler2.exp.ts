import { LoginRequest, LoginResponse } from '@asw-project/shared/dto/authentication/login';
import { Request, Response as ExpressResponse } from 'express';
import * as core from 'express-serve-static-core';
import { Session, SessionData } from 'express-session';

export interface RouteHandler<
  ReqParams = core.ParamsDictionary,
  ReqBody = any,
  ReqQuery = core.Query,
  ResBody = any,
> {
  (
    req: Request<ReqParams, ResBody, ReqBody, ReqQuery, Empty>,
    res: ExpressResponse<ResBody, Empty>,
  ): ExpressResponse<ResBody, Empty>;
}

type Empty = {
  [k in string | number | symbol]: never;
};

interface Response<Body> {
  readonly statusCode: number;
  readonly body?: Body;
}

function route<
  ReqParams = core.ParamsDictionary,
  ReqBody = any,
  ReqQuery = core.Query,
  ResBody = any,
>(
  f: (req: Request<ReqParams, ResBody, ReqBody, ReqQuery, Empty>) => Response<ResBody>,
): RouteHandler<ReqParams, ReqBody, ReqQuery, ResBody> {
  return (req, res) => {
    const { statusCode, body } = f(req);
    return res.status(statusCode).send(body);
  };
}

// eslint-disable-next-line @typescript-eslint/naming-convention
type _ = Empty;

export const login = route<_, LoginRequest, _, LoginResponse>(({ body: { email, password } }) => {
  console.log(email, password);
  return {
    statusCode: 200,
    body: {
      email: 'hello',
    },
  };
});
