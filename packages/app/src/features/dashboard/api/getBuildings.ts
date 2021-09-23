import { WithId } from '@asw-project/shared/data/withId';
import { Library } from '@asw-project/shared/generatedTypes';

const buildings = [
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
  Promise.resolve([]);
// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(buildings);
//     reject(new Error('couldnt fetch'));
//   }, 2000);
// });

export const getBuildingById = async (id: string): Promise<WithId<Library>> =>
  Promise.reject(new Error('Not found'));
// Promise.resolve(buildings[0]);
