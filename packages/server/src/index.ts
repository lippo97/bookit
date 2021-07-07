import generator from '@asw-project/shared';
import { LoginRequest } from '@asw-project/shared/dto/authentication/login';
import { plainToClass } from 'class-transformer';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import validate from './middleware/validate';
import { login } from './controllers/authentication';

const app = express();

app.use((_, res) => {
  res.json({
    random: generator(),
  });
});

app.post('/login', validate(LoginRequest), login);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('running...');
});
