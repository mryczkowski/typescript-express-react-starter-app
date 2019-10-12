import logger from './logger';
import { Request, Response, NextFunction } from 'express';

export class ErrorWithStatus extends Error {
    name = 'ErrorWithStatus';
    httpStatus: number;

    constructor(message: string, httpStatus: number) {
        super(message);
        this.httpStatus = httpStatus;
    }
}

// Log errors to console and file, return err as json
function errorHandler(err, req: Request, res: Response, next: NextFunction) {
    logger.error(err.stack || err.message || err);
    res.status(err.httpStatus || 500).json({message: err.message || err});
}

export default errorHandler;