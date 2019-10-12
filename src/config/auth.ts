// Authentication is handled with JWT sent as an HTTP-only cookie. This prevents xss vulnerabilities
// for tokens accessible with JS on the client. Since it is a cookie, a CSRF token is also added to 
// prevent cross site request forgery.
import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export type JWTPayload = {
    userId?: number,
    csrfToken: string,
}

const tokenExpireTimeSec = 60 * 60 * 1;
const accessTokenCookieName = 'my_app.access_token';
const hasSessionCookieName = 'my_app.has_session';
const csrfTokenCookieName = 'my_app.csrf_token';

export function isAuthenticated() {
    return function (req: express.Request, res: express.Response, next: express.NextFunction) {
        const token = req.cookies[accessTokenCookieName];
        const csrfToken = req.headers['x-csrf-token'] as string;
      
        // decode token
        if (token) {
            // verifies secret and checks exp
            let decoded: string | object;
            try {
                decoded = jwt.verify(token, process.env.API_SECRET || '');

                const payload = decoded as JWTPayload;
                if (!csrfToken || csrfToken !== payload.csrfToken) {
                    return res.status(401).json({ error: 'Request unauthorized.' });
                }

                res.locals.userId = payload.userId;

                return next();
            } catch (err) {
                return res.status(400).json({ error: 'Failed to authenticate token.' });   
            }
        } 
        else {
            return res.status(401).send({ error: 'Authorization required' });
        }
    }
}

export function signToken(res: express.Response, userId?: number) {
    const csrfToken = generateCSRFToken();
    const payload: JWTPayload = {
        userId, 
        csrfToken,
    };
    const token = jwt.sign(payload, process.env.API_SECRET || '', {expiresIn: tokenExpireTimeSec});
    const expireTimeMs = tokenExpireTimeSec * 1000;

    res.header('Access-Control-Allow-Credentials', 'true');
    
    res.cookie(accessTokenCookieName, token, getAccessTokenCookieOpts());
    res.cookie(hasSessionCookieName, true, { maxAge: expireTimeMs }); // Used initially on the client to determine login state since access token is httpOnly
    res.cookie(csrfTokenCookieName, csrfToken, { maxAge: expireTimeMs });
}

export function generateCSRFToken() {
    return crypto.randomBytes(16).toString('hex');
}

export function clearToken(res: express.Response) {
    // opts must match those defined when cookie is set
    res.clearCookie(accessTokenCookieName, getAccessTokenCookieOpts());
    res.clearCookie(hasSessionCookieName);
}

function getAccessTokenCookieOpts() {
    return {
        maxAge: tokenExpireTimeSec * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Access token should be sent over https in production
    };
}