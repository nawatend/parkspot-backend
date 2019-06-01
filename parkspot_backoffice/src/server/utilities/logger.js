/*
Import the extrnal libraries:
- winston
*/
import { createLogger, format, transports } from 'winston';

const {
    align, combine, colorize, timestamp, printf,
} = format;
const logger = createLogger({
    format: combine(
        colorize(),
        timestamp(),
        align(),
        printf((info) => {
            const {
                timestamp: tstamp, level, message, ...args
            } = info;

            const ts = tstamp.slice(0, 19).replace('T', ' ');
            return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
        }),
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: './error.log', level: 'error' }),
        new transports.File({ filename: './info.log', level: 'info' }),
    ],
    exitOnError: false,
});
export default logger;
