import winston from 'winston';

const levels = {
  debug: 0,
  http: 1,
  info: 2,
  warning: 3,
  error: 4,
  fatal: 5,
};

export const loggerDev = winston.createLogger({
  levels,
  transports: [
    new winston.transports.Console({
      level: 'debug',
    }),
  ],
});

export const loggerProd = winston.createLogger({
  levels,
  transports: [
    new winston.transports.File({
      filename: 'errors.log',
      level: 'error',
    }),
  ],
});
