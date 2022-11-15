import CryptoJS from 'crypto-js';
import { UserInputPayload } from "./Auth.dto";
import config from '../../config/index'
import Logger from '../../loaders/logger'
import { UserRepository } from '../../repositories/User.repository';
import { Api500Error } from '../../util/error-handling/Api500Error';
import { Api409Error } from '../../util/error-handling/Api409Error';

export class SignUp {
    async register(userInputDTO: UserInputPayload) {
        Logger.debug('Inside signup service');
        const { username, email, password, profilePic, isAdmin } = userInputDTO;

        if(!config.SecretKey) {
            throw new Api500Error('Missing property in .env');
        }

        const userRepository = new UserRepository();

        const doesUserExist = await userRepository.getUserByEmail(email);

        if(doesUserExist) {
            throw new Api409Error('User already exist!');
        }

        const hashedPassword = CryptoJS.AES.encrypt(password, config.SecretKey).toString();

        const newUser = await  userRepository.createUser(username, email, hashedPassword, profilePic, isAdmin);

        return newUser;
    }
}