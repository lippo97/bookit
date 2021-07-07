import { Email, Password } from '@asw-project/shared/types/authentication';
import { LoginResponse } from '@asw-project/shared/dto/authentication/login';
import { SignupResponse, SignupFail } from '@asw-project/shared/dto/authentication/signup'
import User from '../models/User';


export function login(email: Email, password: Password): Promise<LoginResponse> {
    return User.findOne({ email }).exec()
        .then((user) => {
            if (user === null) {
                return {
                    error: {
                        kind: 'WrongEmailPassword',
                        description: 'The requested user couldn\'t be found',
                    }
                }
            }
            const { email } = user;
            return { email };
        })
}

export function signup(email: Email, password: Password, passwordConfirmation: Password): Promise<SignupResponse> {
    if (password !== passwordConfirmation) {
        return Promise.resolve({
            error: {
                kind: 'PasswordsDoNotMatch'
            }
        });
    }
    return User.create({ email, password })
        .then((user) => {
            const { email } = user;
            return { email };
        })
        .catch((err) => {
            console.error(err)
            throw '';
        })

}