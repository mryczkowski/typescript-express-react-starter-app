import express from 'express';
import passport from 'passport';
import {signToken, clearToken, isAuthenticated} from '../config/auth';
import { authLocal } from '../validation/User';
import { checkValidationErrs } from '../validation/helper';


const authRouter = express.Router();

function authSuccessRedirect(req: express.Request, res: express.Response, next: express.NextFunction) {
    const passportUser = req.user as { id: number };
    if (passportUser) {
        signToken(res, passportUser.id);
    }

    if (req.app.get('env') === 'development') {
        res.redirect('http://localhost:3000/admin');
    }
    else {
        res.redirect('/admin');
    }
}

function authSuccessResponse(req: express.Request, res: express.Response, next: express.NextFunction) {
    const passportUser = req.user as { id: number };
    if (passportUser) {
        signToken(res, passportUser.id);
    }
    
    res.json({ success: true });
}

function logout(req: express.Request, res: express.Response, next: express.NextFunction) {
    clearToken(res);
    res.json({ success: true });
}

// Auth routes
authRouter.get('/auth/google', passport.authenticate('google', {
    session: false,
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
}));
authRouter.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/', session: false }), authSuccessRedirect);

authRouter.post('/auth/local', authLocal, checkValidationErrs, passport.authenticate('local', { session: false }), authSuccessResponse);

authRouter.get('/auth/isAuthenticated', isAuthenticated(), (req, res) => res.json({authenticated: true}));
authRouter.post('/auth/logout', logout);

export default authRouter;