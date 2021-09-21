import { WithId } from '@asw-project/shared/data/withId';
import { Library } from '@asw-project/shared/generatedTypes';
import dayjs from 'dayjs';

const libraries = [
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
];

export const getLibraries = async (): Promise<WithId<Library>[]> =>
  Promise.resolve(libraries);

export const getLibraryById = async (id: string): Promise<WithId<Library>> =>
  Promise.resolve(libraries[0]);

export const createLibrary = (data: Library): Promise<void> => {
  console.log('submitting ', data);
  return Promise.resolve();
};

export const updateLibrary =
  (id: string) =>
  (data: Library): Promise<void> => {
    console.log('updating ', id, data);
    return Promise.resolve();
  };

export const deleteLibrary = (id: string): Promise<void> => {
  console.log('deleting ', id);
  return Promise.resolve();
};
