import { Email, Password } from "@asw-project/shared/types/authentication";
import { getModelForClass, index, prop } from "@typegoose/typegoose";

class User {
    @prop({ required: true, unique: true })
    public email!: Email;

    @prop({ required: true })
    public password!: Password;
}

const UserModel = getModelForClass(User);

export default UserModel;