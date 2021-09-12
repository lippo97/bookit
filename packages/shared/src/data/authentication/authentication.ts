import Joi from 'joi';
import { UserAccountSchema } from '../userAccount';
import { ManagerAccountSchema } from '../managerAccount';
import { Email, Password } from './common';

const email = Email.required().meta({
  _mongoose: {
    unique: true,
  },
});

//const isManager = Joi.boolean().required().default(false);

//const accountType = Joi.string().valid('user', 'manager').required();

/*const account = Joi
  .when('type', {
    is: 'user',
    then: UserAccountSchema,
  })
  .when('type', {
    is: 'manager',
    then: ManagerAccountSchema,
  })
  .allow(null);*/
//const account =  Joi.alternatives().conditional( accountType. == Joi.string('user') , {

const password = Password.required();

//const account = AccountSchema.allow(null);
const schema = {
  email,
  password,
  accountType: Joi.string().valid('user', 'manager').required(),

  account: Joi.alternatives().try(UserAccountSchema, ManagerAccountSchema),
  //.conditional('accountType', { is: Joi.any(), then: UserAccountSchema }),
};
export const AuthenticationSchema = Joi.object(schema).meta({
  className: 'Authentication',
});
