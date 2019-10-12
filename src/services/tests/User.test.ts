import { expect } from 'chai';
import { initTestDB, sequelizeConn } from '../../config/db';
import { User } from '../../models';
import * as UserService from '../User';
import { UserInstance } from '../../models/User';

describe('User service', () => {
    let user: UserInstance;

    beforeEach(async () => {
        await initTestDB();
        user = await User.create({
            id: 1,
            email: 'a@b.com',
            password: '',
            oauthProvider: '',
            oauthProviderAccountId: '',
            isVerified: false,
        });

        return user;
    });
    
    afterEach(async () => {
        return sequelizeConn.close();
    });
    
    describe('Find', () => {
        test('Find works', async () => {
            const foundUser = await UserService.find(user.id as number);
            if (!foundUser) {
                throw new Error('user is null')
            }

            expect(foundUser.id).to.equal(user.id);
        });
    });
});
