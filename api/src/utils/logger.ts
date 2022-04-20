import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import config from 'config';

const LOG_DIR = config.get<string>('logDir') || '/';

// logs dir
const logDir: string = join(__dirname, LOG_DIR);

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level.toUpperCase().padEnd(7)}: ${message}`);

const debugTransport = new winstonDaily({
  level: 'debug',
  datePattern: 'YYYY-MM-DD',
  dirname: logDir + '/debug', // log file /logs/debug/*.log in save
  filename: `%DATE%.log`,
  maxFiles: 10, // 10 Days saved
  json: false,
  // zippedArchive: true,
  symlinkName: 'debug.log',
  createSymlink: true,
});

const errorTransport = new winstonDaily({
  level: 'error',
  datePattern: 'YYYY-MM-DD',
  dirname: logDir + '/error', // log file /logs/error/*.log in save
  filename: `%DATE%.log`,
  maxFiles: 30, // 30 Days saved
  handleExceptions: true,
  json: false,
  // zippedArchive: true,
  symlinkName: 'error.log',
  createSymlink: true,
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: winston.format.combine(
    // winston.format.colorize(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [debugTransport, errorTransport],
});

logger.add(
  new winston.transports.Console({
    level: 'info',
    format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
  }),
);

export default logger;
