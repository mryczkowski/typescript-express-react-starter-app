import passport from 'passport';
import passportGoogle from 'passport-google-oauth';
import passportLocal from 'passport-local';
import bcrypt from 'bcryptjs'; // NOTE: 'bcrypt' module uses OS native dependencies. 'bcryptjs' should work on all OS, but is about 30% slower

import { User } from '../models/index';

const GoogleStrategy = passportGoogle.OAuth2Strategy;
const LocalStrategy = passportLocal.Strategy;

export function configPassport() {
    passport.serializeUser<any, any>((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id: number, done) => {
        User.findByPk(id).then(user => {
            done(null, user as object);
        }).catch(err => {
            done(err);
        });
    });
    
    // Config strategies
    // Uncomment for google sign in. You must have these variables set in your .env file
    // passport.use(new GoogleStrategy({
    //     clientID: process.env.GOOGLE_API_CLIENT_ID,
    //     clientSecret: process.env.GOOGLE_API_CLIENT_SECRET,
    //     callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL,
    // }, verifyOAuthUser));

    passport.use(new LocalStrategy(verifyLocalUser));
}

async function verifyOAuthUser(token: string, refreshToken, profile: passport.Profile, done) {
    const email = getEmailFromProfile(profile);
    if (!email) {
        return done(new Error('An email must be connected to this account'));
    }

    let user = await User.findOne({
        where: { email },
    });
    if (user) {
        if (user.oauthProvider === profile.provider && user.oauthProviderAccountId === profile.id) {
            return done(null, user);
        } else {
            return done(new Error('An account for this email already exists.'));
        }
    }

    try {
        user = await User.create({
            email,
            password: '',
            oauthProvider: profile.provider,
            oauthProviderAccountId: profile.id,
            isVerified: true,
        });

        return done(null, user);
    } catch (err) {
        return done(new Error('An unexpected error occurred :(. Please try again.'));
    }
}

async function verifyLocalUser(email, password, done) {
    const genericError = new Error('Invalid email or password');

    const user = await User.findOne({
        where: { email },
        attributes: { include: [ 'password' ] },
    });
    if (!user || !user.id || !user.password) {
        return done(genericError);
    }

    let matches = false;
    try {
        matches = await bcrypt.compare(password, user.password);
    } catch(err) {
        return done(genericError);
    }

    if (matches) {
        if (!user.isVerified) {
            return done(new Error("Your email needs to be verified."));
        }

        return done(null, user);
    } else {
        return done(genericError);
    }
}

function getEmailFromProfile(profile: passport.Profile): string {
    let email = '';
    if (profile.emails && profile.emails.length > 0) {
        const accountEmailObj = profile.emails.find(emailObj => {
            return emailObj.type === 'account';
        });

        if (accountEmailObj) {
            email = accountEmailObj.value;
        }
        else {
            email = profile.emails[0].value;
        }
    }

    return email;
}