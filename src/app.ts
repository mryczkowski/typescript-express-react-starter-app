import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import expressValidator from 'express-validator';
import rateLimit from 'express-rate-limit';
import redis from 'redis';
import helmet from 'helmet';

import {initDB} from './config/db';
import {configPassport} from './config/passport';
import apiRouter from './routes/api';
import authRouter from './routes/auth';
import errorHandler from './config/errorHandler';

// Create a new express application instance
const app: express.Application = express();
export let redisClient: redis.RedisClient;

export async function configApp() {
    dotenv.config();
    
    const syncModels = process.env.NODE_ENV === 'development';
    await initDB(syncModels);
    
    redisClient = redis.createClient({ host: process.env.REDIS_HOST });
    
    configPassport();
    
    if (process.env.NODE_ENV !== 'development') {
        app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    }

    // Config app
    app.use(helmet());
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(expressValidator());
    app.use(passport.initialize());
    app.use(cors());
    app.options('*', cors());

    // a general rate limiter for all requests from an ip. Implement stricter limits on subroutes that need them
    app.use("/api/", rateLimit({
        windowMs: 5 * 60 * 1000,
        max: 150, // requests per window
        message: {status: 429, message: 'Too many requests, please try again in 5 minutes.' },
    }));
    
    // Routes
    app.use(authRouter);
    app.use('/api', apiRouter);
    
    // Set custom error handler, must be used after all routes.
    app.use(errorHandler);    
}

export default app;