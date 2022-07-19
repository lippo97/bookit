import { ky } from '@/config';
import { WithId } from '@asw-project/shared/data/withId';
import { Library } from '@asw-project/shared/generatedTypes';

export async function getLibraryById(id: string): Promise<WithId<Library>> {
  return ky.get(`libraries/${id}`).json<WithId<Library>>();
}
