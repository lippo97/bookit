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
  console.log(options);

  const searchParams = {
    ...(query === ''
      ? {}
      : {
          '$text[$search]': query,
          accessibility: options.accessible,
          availableServices: JSON.stringify({ $all: options.services }),
          timetable: JSON.stringify({ $in: options.day }),
        }),
  };
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
