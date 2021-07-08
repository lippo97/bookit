import { LoginRequest } from '@asw-project/shared/dto/authentication/login';
import { plainToClass } from 'class-transformer';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SignupRequest } from '@asw-project/shared/dto/authentication/signup';
import validate from './middleware/validate';
import { login } from './controllers/handler2.exp';

const app = express();

app.post('/login', validate(LoginRequest), login);
// app.post('/signup', validate(SignupRequest), signup);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('running...');
});
