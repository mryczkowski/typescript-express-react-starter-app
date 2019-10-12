import winston from 'winston';

// Create a logger to log errors and stuff. In production, should turn off console logging
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: __dirname + '../../error.log', level: 'error' }),
        new winston.transports.Console({ format: winston.format.cli() }),
    ]
});

export default logger;