/* eslint-disable no-underscore-dangle */
import { Resource } from '@asw-project/resources';
import { AuthenticationSchema as AuthenticationJoiSchema } from '@asw-project/shared/data/authentication';
import {
  Authentication,
  Email,
  Password,
} from '@asw-project/shared/generatedTypes';
import { ReturnedUser } from '@asw-project/shared/types/returnedUser';
import { isTrue } from '@asw-project/shared/util/boolean';
import bcrypt, { compare } from 'bcrypt';
import { Document, model, Model, Schema } from 'mongoose';
import { always, Maybe, MaybeAsync } from 'purify-ts';

const SALT_ROUNDS = 10;

type AuthenticationDocument = Authentication &
  Document & {
    isUninitialized(): boolean;
  };

interface TAuthenticationModel extends Model<AuthenticationDocument> {
  findByEmailAndComparePassword(
    email: Email,
    password: Password,
  ): MaybeAsync<ReturnedUser>;
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
  function findByEmailAndComparePassword(
    email: Email,
    password: Password,
  ): MaybeAsync<ReturnedUser> {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const comparePasswords = (password: Password, hash: string) =>
      MaybeAsync(() => compare(password, hash));

    return MaybeAsync(() => this.findOne({ email }).exec())
      .chain((u) => MaybeAsync.liftMaybe(Maybe.fromNullable(u)))
      .chain((user) =>
        comparePasswords(password, user.password) //
          .filter(isTrue)
          .map(
            always({
              userId: user._id,
              email: user.email,
              account: user.account,
              // TODO: salvare le favoriteLibraries pure su authentication sotto forna di FavoriteLibrariesInfo
              // per ora sono salvate ancora come stringhe semplici.
              // packages/shared/src/generatedTypes/authentication.ts:13
              favoriteLibrariesInfo: [],
            }),
          ),
      );
  };

export const AuthenticationModel = model(
  'Authentication',
  AuthenticationSchema,
);
