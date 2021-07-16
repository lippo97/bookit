import bcrypt, { compare } from 'bcrypt';
import { Email, Password } from '@asw-project/shared/authentication/types';
import { getModelForClass, pre, prop, ReturnModelType } from '@typegoose/typegoose';
import { always, MaybeAsync } from 'purify-ts';
import { isTrue } from '@asw-project/shared/util/boolean';

const SALT_ROUNDS = 10;

@pre<User>('save', async function preSave() {
  if (this.modifiedPaths().includes('password')) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashed = await bcrypt.hash(this.password, salt);
    this.password = hashed;
  }
})
class User {
  @prop({ required: true, unique: true })
  public email!: Email;

  @prop({ required: true })
  public password!: Password;

  public static findByEmailAndComparePassword(
    this: ReturnModelType<typeof User>,
    email: Email,
    password: Password,
  ): MaybeAsync<User> {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const comparePasswords = (password: Password, hash: string) =>
      MaybeAsync(() => compare(password, hash));

    return MaybeAsync(() => this.findOne({ email }).exec())
      .filter((u) => u !== null)
      .map((u) => u!) // I think this is safe
      .chain((user) =>
        comparePasswords(password, user.password) //
          .filter(isTrue)
          .map(always(user)),
      );
  }
}

const UserModel = getModelForClass(User);

export default UserModel;
