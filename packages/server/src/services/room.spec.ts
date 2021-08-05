import { RoomService } from './rooms';

const properties = ['findById', 'findAll', 'create', 'update', 'remove'];

const roomService = new RoomService();

describe('Room resource', () => {
  it('should have mixin applied', () => {
    properties.forEach(expect(roomService).toHaveProperty);
  });
});
