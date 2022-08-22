import { ky } from '@/config';
import { Day } from '@/lib/timetable/types';
import { WithId } from '@asw-project/shared/data/withId';
import {
  FavoriteLibrariesInfo,
  Library,
  Room,
  Service,
} from '@asw-project/shared/generatedTypes';

export async function getLibraryById(id: string): Promise<WithId<Library>> {
  return ky.get(`libraries/${id}`).json<WithId<Library>>();
}

interface GetLibrariesOptions {
  readonly day: Day;
  readonly accessible: boolean;
  readonly services: Service[];
}

export async function getLibraries(
  query: string,
  options: Partial<GetLibrariesOptions>,
): Promise<WithId<Library>[]> {
  const searchParams = new URLSearchParams();
  if (query !== '') {
    searchParams.set('$text[$search]', query);
  }
  if (options.services) {
    // eslint-disable-next-line no-restricted-syntax
    for (const s of options.services) {
      searchParams.append('availableServices[$all]', s);
    }
  }
  if (options.accessible) {
    searchParams.set('accessibility', JSON.stringify(true));
  }
  if (options.day) {
    searchParams.set('timetable[$elemMatch][days]', options.day.toString());
  }
  return ky
    .get('libraries', {
      searchParams,
    })
    .json<WithId<Library>[]>();
}

export async function changeFavorite(
  isNowFavorite: boolean,
  libraryId: string,
  libraryName: string,
) {
  return isNowFavorite
    ? ky.delete(`favorite/${libraryId}`).json<FavoriteLibrariesInfo[]>()
    : ky
        .post('favorite', { json: { libraryId, name: libraryName } })
        .json<FavoriteLibrariesInfo[]>();
}

export async function getRooms(libraryId: string): Promise<WithId<Room>[]> {
  const searchParams = {
    libraryId,
  };
  return ky.get('rooms', { searchParams }).json<WithId<Room>[]>();
}
