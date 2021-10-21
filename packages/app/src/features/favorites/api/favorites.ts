import { Library } from '@asw-project/shared/generatedTypes';
import { WithId } from '@asw-project/shared/data/withId';
import { ky } from '@/config';

export async function getFavorites(): Promise<WithId<Library>[]> {
  return ky.get('favorite').json<WithId<Library>[]>();
}
