import { Room, Service } from '@asw-project/shared/generatedTypes';
import { SeatMap } from '../stores/seats';
import { V2ToPosition } from '@asw-project/shared/types/position';
import { fst, snd } from '@asw-project/shared/util/tuples';
import { pick } from '@asw-project/shared/util/objects';

const serviceObjectToArray = (
  input: SeatMap[string]['services'],
): Room['seats'][number]['services'] =>
  Object.entries(input)
    .filter(([_, value]) => value)
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
