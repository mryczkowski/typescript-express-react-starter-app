import Sequelize from 'sequelize';
import { SequelizeAttributes } from '../typings/sequelize';

export interface UserAttributes {
    id?: number;
    email: string;
    password: string;
    oauthProvider: string;
    oauthProviderAccountId: string;
    isVerified: boolean;
};
export type UserInstance = Sequelize.Instance<UserAttributes> & UserAttributes;
export type UserModel = Sequelize.Model<UserInstance, UserAttributes>;

export function defineUser(seq: Sequelize.Sequelize) {
    const attr: SequelizeAttributes<UserAttributes> = {
        email: { type: Sequelize.STRING, unique: true },
        password: Sequelize.STRING,
        oauthProvider: Sequelize.STRING,
        oauthProviderAccountId: Sequelize.STRING,
        isVerified: { type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false },
    }

    return seq.define<UserInstance, UserAttributes>('user', attr, {
        defaultScope: {
            attributes: {
                exclude: ['password'],
            },
        },
    });
}