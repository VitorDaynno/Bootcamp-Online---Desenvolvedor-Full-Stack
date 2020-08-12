import winston from 'winston';

const { format, createLogger, transports } = winston;
const { printf, combine, colorize, timestamp } = format;
const { Console, File } = transports;

const logger = (filename) => {
  const myFormat = printf(({ level, message, timestamp }) => {
    const format = filename
      ? `${level}: [${timestamp}][${filename}] ${message}`
      : `${level}: [${timestamp}]${message}`;
    return format;
  });

  const logger = createLogger({
    format: combine(
      colorize(),
      timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
      format.splat(),
      myFormat
    ),
    transports: [
      new Console(),
      new File({ filename: 'error.log', level: 'error' }),
    ],
  });

  return logger;
};

export default logger;
