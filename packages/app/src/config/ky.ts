import kyFactory, { Options } from 'ky';
import { BACKEND_URL } from './constants';

const options: Options = {
  credentials: 'include',
  prefixUrl: `${BACKEND_URL}/api/v1`,
};

const instance = kyFactory.create(options);

export const ky = instance;
