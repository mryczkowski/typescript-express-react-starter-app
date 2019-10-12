// import { promisify } from 'util';
import bcrypt from 'bcryptjs';

import { User } from "../models";
import { UserAttributes } from '../models/User';
// import { redisClient } from '../app';
import { ErrorWithStatus } from '../config/errorHandler';

export async function registerUser(data: UserAttributes) {
    if (!data.email || !data.password) {
        throw new ErrorWithStatus('Empty email or password provided', 400);
    }

    let user = await User.findOne({
        where: {
            email: data.email,
        },
    });
    if (user) {
        throw new ErrorWithStatus('An account already exists for that email', 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    user = await User.create({
        email: data.email,
        password: hashedPassword,
        oauthProvider: '',
        oauthProviderAccountId: '',
        isVerified: true, // In a real app, you'd probably want to set this to false first and send a verification email. This is true just for example only
    });

    // Send a verification email here

    return user;
}

export async function find(id: number) {
    return User.findByPk(id);
}

// Uncomment when there is an email verification step
// export async function verifyEmail(userId: number, token: string) {
//     const redisGetAsync = promisify(redisClient.get).bind(redisClient);
//     const storedToken = await redisGetAsync(getUserEmailVerificationCacheKey(userId));

//     if (!storedToken || storedToken !== token) {
//         throw new ErrorWithStatus('This link is no longer valid', 422);
//     }

//     const user = await User.findByPk(userId);
//     if (!user) {
//         throw new Error('An unexpected error occurred, please refresh the page to try again.');
//     }

//     if (!user.isVerified) {
//         user.isVerified = true;
//         await user.save();
//     }

//     redisClient.del(getUserEmailVerificationCacheKey(userId));

//     return true;
// }

// export function getUserEmailVerificationCacheKey(userId: number) {
//     return `user-email-verification-token:${userId}`;
// }
