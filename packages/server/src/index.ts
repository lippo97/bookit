import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ENVIRONMENT } from './config/constants';
import sessionOptions from './config/session';
import configureMongoose from './config/mongoose';
import dotenvConfig from './config/dotenv';
import { handleResponse, logError } from './middleware/errors';
import authenticationRouter from './routers/authentication';

async function main() {
  console.log(`Application running in ${ENVIRONMENT}`);
  dotenv.config(dotenvConfig);
  console.log(process.env);

  await configureMongoose(mongoose);

  const app = express();

  app.use(session(sessionOptions));
  app.use(express.json());

  app.use(authenticationRouter);
  app.get('/whoami', (req, res) => {
    if (req.session.userId) {
      return res.json({
        userId: req.session.userId,
      });
    }
    return res.sendStatus(401);
  });

  app.use(logError);
  app.use(handleResponse);

  app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('running...');
  });
}

main();
