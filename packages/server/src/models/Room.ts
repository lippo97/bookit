import { getModelForClass, prop } from '@typegoose/typegoose';

export const roomKeys = ['capacity', 'name'];

export class Room {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, min: 5 })
  public capacity!: number;
}

export const RoomModel = getModelForClass(Room);