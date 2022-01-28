import { Room, Service } from '@asw-project/shared/generatedTypes';
import { V2ToPosition } from '@asw-project/shared/types/position';
import { fst } from '@asw-project/shared/util/tuples';
import { pick } from '@asw-project/shared/util/objects';
import { SeatMap } from '../stores/seats';

const serviceObjectToArray = (
  input: SeatMap[string]['services'],
): Room['seats'][number]['services'] =>
  Object.entries(input)
    .filter(([, value]) => value)
    .map(fst) as Service[];

export const updateRoomSeats = (
  roomId: string,
  seatMap: SeatMap,
): Promise<void> => {
  const seats: Room['seats'] = Object.values(seatMap)
    .map(pick('position', 'services'))
    .map(({ position, services }) => ({
      position: V2ToPosition(position),
      services: serviceObjectToArray(services),
    }));
  console.log('transformed', seats);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

// TODO
export async function createLibraryRoom(
  id: string,
  name: string,
  accessibility: boolean,
): Promise<void> {
  Promise.resolve();
}

// TODO
export async function getLibraryRoomById(
  id: string,
  roomid: string,
): Promise<Room> {
  return Promise.resolve({
    name: 'ciao',
    capacity: 30,
    libraryId: '10',
    seats: [
      {
        position: { x: 3, y: 3 },
        services: ['Wi-Fi', 'Printer'],
      },
    ],
    accessibility: true,
  });
}

// TODO
export async function updateLibraryRoom(
  id: string,
  roomId: string,
  name: string,
  accessibility: boolean,
): Promise<void> {
  Promise.resolve();
}

// TODO
export async function deleteLibraryRoom(
  id: string,
  roomId: string,
): Promise<void> {
  Promise.resolve();
}
