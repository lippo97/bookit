/* eslint-disable no-console */
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { ENVIRONMENT, IS_DEVELOPMENT } from './config/constants';
import sessionOptions from './config/session';
import configureMongoose from './config/mongoose';
import dotenvConfig from './config/dotenv';
import { handleResponse, logError } from './middleware/errorHandlers';
import apiV1 from './api/v1';

async function main() {
  console.log(`Application running in ${ENVIRONMENT}.`);
  dotenv.config(dotenvConfig);

  await configureMongoose(mongoose);

  const app = express();

  app.use(cors({ credentials: true, origin: ['http://localhost:8080'] }));
  app.use(session(sessionOptions));
  app.use(express.json());

  app.use('/api/v1', apiV1);

  app.use(logError);
  app.use(handleResponse);

  app.listen(3000, () => {
    console.log('running...');
  });
}

main();
