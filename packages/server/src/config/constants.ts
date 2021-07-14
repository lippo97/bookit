const development = 'development';

const production = 'production';

const localhost = '127.0.0.1';

const redisPort = 6379;

export const ENVIRONMENT = process.env.NODE_ENV || development;

export const IS_PRODUCTION = ENVIRONMENT === production;

export const IS_DEVELOPMENT = ENVIRONMENT === development;

function parse(num: string | null | undefined): number {
  if (num) {
    return parseInt(num, 10);
  }
  throw new Error(`Couldnt parse ${num}.`);
}

function keyOrDefault(k: string, default_: string) {
  if (process.env[k]) {
    return process.env[k];
  }
  if (IS_PRODUCTION) {
    throw new Error('Undefined environment variable.');
  }
  return default_;
}

function keyOrDefaultNum(k: string, default_: number) {
  return parse(keyOrDefault(k, default_.toString()));
}

const str = keyOrDefault;

const num = keyOrDefaultNum;

export const IS_HTTPS = false;

export const COOKIE_SECRET = str('COOKIE_SECRET', 's3kr37');

export const MONGODB_HOST = str('MONGODB_HOST', 'localhost');

export const MONGODB_PORT = num('MONGODB_PORT', 27017);

export const REDIS_HOST = str('REDIS_HOST', localhost);

export const REDIS_PORT = num('REDIS_PORT', redisPort);
