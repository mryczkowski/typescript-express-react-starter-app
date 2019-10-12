import { validationResult } from 'express-validator/check';
import { Request, Response, NextFunction } from 'express';

export function checkValidationErrs(req: Request, res: Response, next: NextFunction) {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
        return res.status(422).json({ validationErrors: errs.array() });
    }
    
    return next();
}