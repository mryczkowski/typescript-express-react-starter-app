import { Request, Response, NextFunction } from 'express';
import * as service from '../services/User';

export function registerUser(req: Request, res: Response, next: NextFunction) {
    service.registerUser(req.body).then(user => {
        user.password = ''; //remove password field from created object
        res.json({ user });
    }).catch(next);
}

export function getCurrentUser(req: Request, res: Response, next: NextFunction) {
    service.find(res.locals.userId).then(user => {
        res.json(user);
    }).catch(next);
}