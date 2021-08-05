import { SignupRequestSchema as SignupRequestJoiSchema } from '@asw-project/shared/data/authentication/signup/request';
import {
  Authentication,
  Email,
  Password,
} from '@asw-project/shared/generatedTypes/authentication';
import { isTrue } from '@asw-project/shared/util/boolean';
import bcrypt, { compare } from 'bcrypt';
import { Document, model, Model, Schema } from 'mongoose';
import { always, Maybe, MaybeAsync } from 'purify-ts';
import { Resource } from '@asw-project/resources';

const SALT_ROUNDS = 10;

type AuthenticationDocument = Authentication & Document;

// type AuthenticationDocument = SignupRequest &
//   Document & {
//     account: Account | null;
//   };

interface TAuthenticationModel extends Model<AuthenticationDocument> {
  findByEmailAndComparePassword(
    email: Email,
    password: Password,
  ): MaybeAsync<Pick<Authentication, 'email'>>;
}

const AuthenticationSchema = new Schema<
  AuthenticationDocument,
  TAuthenticationModel
>(Resource.extractSchema<AuthenticationDocument>(SignupRequestJoiSchema));

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
          .map(always(user)),
      );
  };

export const AuthenticationModel = model(
  'Authentication',
  AuthenticationSchema,
);
