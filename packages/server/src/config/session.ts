import redis from 'redis';
import connect from 'connect-redis';
import session, { SessionOptions } from 'express-session';
import { COOKIE_SECRET, IS_HTTPS as HTTPS_ENABLED, IS_PRODUCTION } from './constants';
import redisOptions from './redis';

let RedisStore;
let client;
let store;

if (IS_PRODUCTION) {
  RedisStore = connect(session);
  client = redis.createClient(redisOptions);
  store = new RedisStore({ client });

  client.set('pippo', 'true');
  client.set('pluto', 'false');
  client.set('dolan', 'maybe');
}

const sessionOptions: SessionOptions = {
  ...{
    secret: 's3kr37',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: HTTPS_ENABLED,
      httpOnly: IS_PRODUCTION,
      signed: IS_PRODUCTION,
    },
  },
  ...(IS_PRODUCTION
    ? {
        secret: COOKIE_SECRET,
        store,
        resave: false,
        saveUninitialized: false,
      }
    : {}),
};

export default sessionOptions;
