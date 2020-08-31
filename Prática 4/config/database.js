import mongoose from 'mongoose';

import Logger from '../config/logger.js';
import Settings from './settings.js';

const logger = Logger('AccountBO');

const settings = new Settings();

class Database {
  constructor() {
    mongoose.connect(settings.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on('connected', () => {
      logger.info('Mongoose! Connected at database');
    });

    mongoose.connection.on('disconnected', () => {
      logger.info('Mongoose! Disconnected at database');
    });

    mongoose.connection.on('error', (error) => {
      logger.error('Mongoose! Error : ' + error);
    });

    process.on('SIGINT', function () {
      mongoose.connection.close(function () {
        logger.info('Mongoose! Disconnected by the application');
        process.exit(0);
      });
    });
  }
}
export default Database;
