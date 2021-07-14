import { DotenvConfigOptions } from 'dotenv';
import path from 'path';

const dotenvFileName = '.env.server';
const dotenvPath = path.resolve(__dirname, `../../../../${dotenvFileName}`);

const options: DotenvConfigOptions = {
  path: dotenvPath,
};

export default options;
