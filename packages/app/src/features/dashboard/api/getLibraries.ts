import { WithId } from '@asw-project/shared/data/withId';
import { Library } from '@asw-project/shared/generatedTypes';
import {
  getLibraryById as getLibraryByIdLibraryAPI,
  getLibraries as getLibrariesLibraryAPI,
} from '@/features/libraries/api/getLibraries';

export async function getLibraryById(id: string): Promise<WithId<Library>> {
  return getLibraryByIdLibraryAPI(id);
}

export async function getLibraries(): Promise<WithId<Library>[]> {
  return getLibrariesLibraryAPI('');
}

/** TO DELETE
 * 
 *  const buildings = [
  {
    _id: '2',
    name: 'Biblioteca San Giovanni',
    street: 'via Passeri',
    city: 'Pesaro',
    timetable: [],
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
];

export const getBuildings = async (): Promise<WithId<Library>[]> =>
  Promise.resolve(buildings);
// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(buildings);
//     reject(new Error('couldnt fetch'));
//   }, 2000);
// });

export const getBuildingById = async (id: string): Promise<WithId<Library>> =>
  ky.get(`buildings/${id}`).json<WithId<Library>>();
*/
