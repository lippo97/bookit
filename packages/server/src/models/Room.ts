import { getModelForClass, prop } from '@typegoose/typegoose';

export class Room {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public capacity!: number;
}

export const RoomModel = getModelForClass(Room);
