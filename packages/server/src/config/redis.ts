import { ClientOpts } from 'redis';
import { REDIS_HOST, REDIS_PORT } from './constants';

const options: ClientOpts = {
  host: REDIS_HOST,
  port: REDIS_PORT,
};

export default options;
