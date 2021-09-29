// eslint-disable-next-line import/no-extraneous-dependencies
import { convertFromDirectory } from 'joi-to-typescript';
import _ from 'lodash';
import path from 'path';
import { find } from '../src/find/find';

const srcRoot = path.join(__dirname, '../src');
const dataDir = path.join(srcRoot, 'data');
const outputDirName = 'generatedTypes';

function convertDir(dir: string, debug: boolean = false) {
  const schemaDirectory = path.join(dataDir, dir);
  const typeOutputDirectory = path.join(srcRoot, `${outputDirName}/${dir}`);

  return convertFromDirectory({
    schemaDirectory,
    typeOutputDirectory,
    debug,
  });

}

const handleError = (err: any) => console.error(err);

async function main() {
  const targets = [
    ...(
      await find(dataDir, {
        maxDepth: 'unbound',
        target: 'directories',
      })
    )
      .map((p) => p.absolute())
      .map((p) => p.replace(dataDir, '.')),
    '.',
  ];

  console.log(`Found ${targets.length} targets:`);
  targets.forEach((path) => console.log(`- ${path}`));
  const conversions = targets.map((p) => convertDir(p, true).catch(handleError));

  const aggregateResult = await Promise.all(conversions);

  if (aggregateResult) {
    console.log('Type generation completed.');
  } else {
    console.log('Failed type generation.');
  }
}

main();
