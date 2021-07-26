import { LoginFail } from '@asw-project/shared/authentication/dto/login';
import { SignupFail } from '@asw-project/shared/authentication/dto/signup';
import { Request, NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Left, Right } from 'purify-ts';
import { mocked } from 'ts-jest/utils';
import * as authenticationService from '../services/authentication';
import * as authenticationController from './authentication';

jest.mock('../services/authentication');

const mockedService = mocked(authenticationService, true);
const makeRequest = () =>
  ({
    body: {},
    session: {},
  } as Request);

let req: Request = makeRequest();
const sendStatus = jest.fn();
const json = jest.fn();
const res: Response = {
  sendStatus,
  json,
  status: jest.fn().mockReturnThis(),
} as any as Response;
const next: NextFunction = jest.fn();

beforeEach(() => {
  req = makeRequest();
  sendStatus.mockClear();
  json.mockClear();
});

describe('Authentication controller', () => {
  describe('login', () => {
    beforeEach(() => {
      mockedService.login.mockRestore();
    });
    it('should return a valid response', async () => {
      const success = { email: 'mario@example.com' };
      mockedService.login.mockResolvedValue(Right(success));
      await authenticationController.login(req, res, next);
      expect(res.json).toBeCalledWith(success);
    });
    it('should set the session id', async () => {
      const success = { email: 'mario@example.com' };
      mockedService.login.mockResolvedValue(Right(success));
      await authenticationController.login(req, res, next);
      expect(req.session.userId).toBe(success.email);
    });
    it('should pass through an invalid credentials error', async () => {
      const fail: LoginFail = {
        kind: 'WrongEmailPassword',
      };
      mockedService.login.mockResolvedValue(Left(fail));
      await authenticationController.login(req, res, next);
      expect(next).toBeCalledWith(fail);
    });
  });
  describe('signin', () => {
    beforeEach(() => {
      mockedService.signup.mockRestore();
    });
    it('should return a created response', async () => {
      const success = { email: 'mario@example.com' };
      mockedService.signup.mockResolvedValue(Right(success));
      await authenticationController.signup(req, res, next);
      expect(res.status).toBeCalledWith(StatusCodes.CREATED);
      expect(res.json).toBeCalledWith(success);
    });
    it('should pass through the error', async () => {
      const fail: SignupFail = {
        kind: 'DuplicateEmail',
      };
      mockedService.signup.mockResolvedValue(Left(fail));
      await authenticationController.signup(req, res, next);
      expect(next).toBeCalledWith(fail);
    });
  });
  describe('logout', () => {
    it('should return code 205', async () => {
      const req2 = {
        ...req,
        session: {
          userId: 10,
          destroy: jest.fn((cb) => cb(null)),
        },
      } as any as Request;
      await authenticationController.logout(req2, res, next);
      expect(res.sendStatus).toBeCalledWith(StatusCodes.RESET_CONTENT);
    });
    it('should return code 404', async () => {
      const req2 = {
        ...req,
        session: {
          userId: undefined,
          destroy: jest.fn((cb) => cb()),
        },
      } as any as Request;
      await authenticationController.logout(req2, res, next);
      expect(res.sendStatus).toBeCalledWith(StatusCodes.NOT_FOUND);
    });
    it('should pass error to next', async () => {
      const error = new Error('hello');
      const req2 = {
        ...req,
        session: {
          userId: 10,
          destroy: jest.fn((cb) => cb(error)),
        },
      } as any as Request;
      await authenticationController.logout(req2, res, next);
      expect(next).toBeCalledWith(error);
    });
  });
});
