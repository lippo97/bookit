const development = 'development';

const production = 'production';

const localhost = '127.0.0.1';

const mongodbPort = 27017;

const redisPort = 6379;

const s3Port = 9000;

export const APPLICATION_PORT = process.env.PORT || 3000;

export const ENVIRONMENT = process.env.NODE_ENV || development;

export const IS_PRODUCTION = ENVIRONMENT === production;

export const IS_DEVELOPMENT = !IS_PRODUCTION;

function parse(num: string | null | undefined): number {
  if (num) {
    return parseInt(num, 10);
  }
  throw new Error(`Couldnt parse ${num}.`);
}

function keyOrDefault(k: string, default_: string): string {
  if (process.env[k] !== undefined) {
    return process.env[k] as string;
  }
  if (IS_PRODUCTION) {
    throw new Error(`Undefined environment variable: ${k}`);
  }
  return default_;
}

function keyOrDefaultNum(k: string, default_: number): number {
  return parse(keyOrDefault(k, default_.toString()));
}

const str = keyOrDefault;

const num = keyOrDefaultNum;

export const IS_HTTPS = false;

export const COOKIE_SECRET = str('COOKIE_SECRET', 's3kr37');

export const MONGODB_HOST = str('MONGODB_HOST', 'localhost');

export const MONGODB_PORT = num('MONGODB_PORT', mongodbPort);

export const REDIS_HOST = str('REDIS_HOST', localhost);

export const REDIS_PORT = num('REDIS_PORT', redisPort);

export const S3_HOST = str('S3_HOST', localhost);

export const S3_PORT = num('S3_PORT', s3Port);

export const S3_PUBLIC_HOST = str('S3_PUBLIC_HOST', localhost);

export const S3_PUBLIC_PORT = num('S3_PUBLIC_PORT', s3Port);

export const S3_ACCESS_KEY_ID = str('S3_ACCESS_KEY_ID', 'development');

export const S3_SECRET_ACCESS_KEY = str('S3_SECRET_ACCESS_KEY', 'development');
