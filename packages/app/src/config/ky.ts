import ky, { Options } from 'ky';
import { BACKEND_URL } from '.';

const options: Options = {
  credentials: 'include',
  prefixUrl: `${BACKEND_URL}/api/v1`,
};

const instance = ky.create(options);
console.log('backendurl', BACKEND_URL);

export default instance;
