import { DotenvConfigOptions } from 'dotenv';
import path from 'path';
import { existsSync } from 'fs';

const dotenvFileName = '.env.server';
const dotenvPath = path.resolve(__dirname, `../../../../${dotenvFileName}`);
if (!existsSync(dotenvPath)) {
  console.log(`Specified dotenv file: ${dotenvPath} does not exist.`);
}

const options: DotenvConfigOptions = {
  path: dotenvPath,
};

export default options;
