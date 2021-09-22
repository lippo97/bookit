import { ky } from '@/config/ky';
import { useAuth } from '@/stores/authentication';
import { WithId } from '@asw-project/shared/data/withId';
import { Library } from '@asw-project/shared/generatedTypes';
import dayjs from 'dayjs';

// TO DELETE

/* const buildings = [
  {
    _id: '2',
    name: 'Biblioteca San Giovanni',
    street: 'via Passeri',
    city: 'Pesaro',
    timetable: [
      {
        days: [0, 1, 2, 3, 4, 5, 6],
        slot: {
          from: dayjs().minute(8).minute(30).second(0).toDate(),
          to: dayjs().minute(12).minute(30).second(0).toDate(),
        },
      },
    ],
    availableServices: [],
    rooms: [],
    imageFilename: '61311a76140b1f7443dfa38c.jpg',
  },
  {
    _id: '1',
    name: 'Biblioteca 5 Torri',
    street: 'Largo Volontari del sangue',
    city: 'Pesaro',
    timetable: [],
    availableServices: [],
    rooms: [],
    imageFilename: '61311a76140b1f7443dfa38c.jpg',
  },
]; */

export async function getLibraryById(
  libraryId: string,
): Promise<WithId<Library>> {
  return ky.get(`libraries/${libraryId}`).json<WithId<Library>>();
}

export async function getLibraries(): Promise<WithId<Library>[]> {
  const authInfo = useAuth.getState().auth;
  const searchParams = {
    ownerId: authInfo?.userId,
  };
  return ky.get('libraries', { searchParams }).json<WithId<Library>[]>();
}

export type CreateLibraryArg = Pick<
  Library,
  | 'city'
  // | 'imageFilename'
  | 'name'
  // | 'rooms'
  | 'street'
  | 'timetable'
>;

export async function createLibrary(
  data: CreateLibraryArg,
): Promise<WithId<Library>> {
  return ky.post('libraries', { json: data }).json<WithId<Library>>();
}
export const updateLibrary =
  (id: string) =>
  (data: CreateLibraryArg): Promise<void> => {
    console.log('updating ', id, data);
    return Promise.resolve();
  };

export const deleteLibrary = (id: string): Promise<void> => {
  console.log('deleting ', id);
  return Promise.resolve();
};
export const getBuildingById = async (id: string): Promise<WithId<Library>> =>
  ky.get(`buildings/${id}`).json<WithId<Library>>();
