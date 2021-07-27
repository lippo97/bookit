import { getModelForClass, prop } from '@typegoose/typegoose';

export class Account {
  @prop()
  public firstName!: string;

  @prop()
  public secondName!: string;

  @prop()
  public birthDate!: Date;

  @prop()
  public maleFemale!: 'male' | 'female' | 'other';
}

export const AccountModel = getModelForClass(Account);
