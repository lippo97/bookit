export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const IS_PRODUCTION = process.env.ENV === 'production';

export const IS_DEVELOPMENT = !IS_PRODUCTION;

export const S3_URL = IS_DEVELOPMENT
  ? 'http://localhost:9000'
  : process.env.S3_URL;
