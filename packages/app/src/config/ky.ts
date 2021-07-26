import ky, { Options } from 'ky';
import { BACKEND_URL } from '.';

const options: Options = {
  credentials: 'include',
  prefixUrl: BACKEND_URL,
};

const instance = ky.create(options);
console.log('backendurl', BACKEND_URL);

export default instance;
