/* eslint-disable no-underscore-dangle */
import {
  AccountSchema,
  AuthenticationSchema as AuthenticationJoiSchema,
} from '@asw-project/shared/data/authentication/authentication';
import {
  Account,
  Authentication,
  Email,
  Password,
} from '@asw-project/shared/generatedTypes/authentication';
import { isTrue } from '@asw-project/shared/util/boolean';
import bcrypt, { compare } from 'bcrypt';
import { Document, model, Model, Schema } from 'mongoose';
import { always, Maybe, MaybeAsync } from 'purify-ts';
import { Resource } from '@asw-project/resources';
import {
  ManagerAccount,
  UserAccount,
} from '@asw-project/shared/generatedTypes';

const SALT_ROUNDS = 10;

export function isUser(account: Account): account is UserAccount {
  return account.type === 'user';
}

export function isManager(account: Account): account is ManagerAccount {
  return !isUser(account);
}

type AuthenticationDocument = Authentication &
  Document & {
    isUninitialized(): boolean;
  };

interface TAuthenticationModel extends Model<AuthenticationDocument> {
  findByEmailAndComparePassword(
    email: Email,
    password: Password,
  ): MaybeAsync<Required<Pick<AuthenticationDocument, '_id'>>>;
}

const AuthenticationSchema = new Schema<
  AuthenticationDocument,
  TAuthenticationModel
>(Resource.extractSchema<AuthenticationDocument>(AuthenticationJoiSchema));

// see: https://github.com/yoitsro/joigoose/issues/25 // Unfortunate unexpected behavior by joigoose

AuthenticationSchema.remove([
  'account.email',
  'account.firstName',
  'account.secondName',
  'account.birthDate',
  'account.maleFemale',
]);

AuthenticationSchema.pre<AuthenticationDocument>(
  'save',
  async function preSave() {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hashed = await bcrypt.hash(this.password, salt);
      this.password = hashed;
    }
  },
);

AuthenticationSchema.methods.isUninitialized = function isUninitialized() {
  return this.account === undefined;
};

AuthenticationSchema.statics.findByEmailAndComparePassword =
  function findByEmailAndComparePassword(email: Email, password: Password) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const comparePasswords = (password: Password, hash: string) =>
      MaybeAsync(() => compare(password, hash));

    return MaybeAsync(() => this.findOne({ email }).exec())
      .chain((u) => MaybeAsync.liftMaybe(Maybe.fromNullable(u)))
      .chain((user) =>
        comparePasswords(password, user.password) //
          .filter(isTrue)
          .map(always(user._id)),
      );
  };

export const AuthenticationModel = model(
  'Authentication',
  AuthenticationSchema,
);
