import path from 'path';
import fsCallback, { PathLike } from 'fs';
import { partition } from './partition';

const fs = fsCallback.promises;

abstract class FindMatch {
  abstract absolute(): string;

  abstract basename(): string;

  abstract dirname(): string;

  abstract extname(): string;

  abstract isFile(): Promise<boolean>;

  static of(pathLike: PathLike) {
    return new FindMatchImpl(pathLike);
  }
}

class FindMatchImpl extends FindMatch {
  constructor(public pathLike: PathLike) {
    super();
  }

  absolute(): string {
    return path.resolve(this.pathLike.toString());
  }

  basename(): string {
    return path.basename(this.pathLike.toString());
  }
  dirname(): string {
    return path.dirname(this.pathLike.toString());
  }
  extname(): string {
    return path.extname(this.pathLike.toString());
  }

  private lstat(): Promise<fsCallback.Stats> {
    return fs.lstat(this.absolute());
  }

  isFile(): Promise<boolean> {
    return this.lstat().then((_) => _.isFile());
  }
}

type FindOptions = Partial<{
  maxDepth: number | 'unbound';
  pattern: string | RegExp;
  target: 'files' | 'directories';
}>;

export function find(
  root: PathLike,
  options?: FindOptions,
): Promise<FindMatch[]> {
  async function go(
    root: PathLike,
    pattern: string | RegExp,
    maxDepth: number | 'unbound',
    current: number,
  ): Promise<FindMatch[]> {
    const target = options?.target || 'files';

    const resolvedRoot = path.resolve(root.toString());
    const content = (await fs.readdir(resolvedRoot))
      .map((_) => path.resolve(resolvedRoot, _))
      .map(FindMatch.of);

    const matches = (regExp: RegExp | string) => (findMatch: FindMatch) => {
      if (regExp instanceof RegExp) {
        return regExp.test(findMatch.absolute());
      }
      return findMatch.absolute().includes(regExp);
    };

    const [files, dirs] = await partition((_) => _.isFile(), content);
    const flatten = <T>(arr: T[][]): T[] =>
      arr.reduce((acc, value) => acc.concat(value), []);

    const next =
      maxDepth === 'unbound' || current < maxDepth
        ? await Promise.all(
            dirs.map((d) => go(d.absolute(), pattern, maxDepth, current + 1)),
          )
        : [];

    return [...(target === 'files' ? files : dirs), ...flatten(next)].filter(
      matches(pattern),
    );
  }

  const maxDepth = options?.maxDepth || 1;
  const pattern = options?.pattern || /[\S\s]*/;

  return go(root, pattern, maxDepth, 1);
}
