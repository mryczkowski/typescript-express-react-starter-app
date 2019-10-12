import Sequelize from 'sequelize';
import {defineUser, UserModel} from './User';

export let User: UserModel;

export function defineModels(sequelize: Sequelize.Sequelize) {
    User = defineUser(sequelize);
    
    // Define associations here
}

