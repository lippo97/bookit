import { LoginRequest } from '@asw-project/shared/dto/authentication/login';
import { plainToClass } from 'class-transformer';
import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SignupRequest } from '@asw-project/shared/dto/authentication/signup';
import mongoose from 'mongoose';
import validate from './middleware/validate';
import { handleResponse, logError } from './middleware/errors';
import { login, signup } from './controllers/authentication';

mongoose
  .connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'test',
  })
  .then(() => {
    const app = express();

    app.use(express.json());

    app.post('/login', validate(LoginRequest), login);
    app.post('/signup', validate(SignupRequest), signup);

    app.use(logError);
    app.use(handleResponse);

    app.listen(3000, () => {
      // eslint-disable-next-line no-console
      console.log('running...');
    });
  });
