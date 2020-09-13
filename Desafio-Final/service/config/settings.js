import dotenv from 'dotenv';

import Logger from './logger.js';

const logger = Logger('Settings');

class Settings {
  constructor() {
    dotenv.config();
    this.servicePort = this.getEnviroment('PORT');
    this.mongoUrl = this.getEnviroment('DB_CONNECTION');
  }
  getEnviroment(name) {
    try {
      const value = process.env[name];

      if (!value) {
        throw Error(`An enviroment variable ${name} not foud`);
      }

      return value;
    } catch (error) {
      logger.error(`An error occurred: ${error}`);
      process.exit();
    }
  }
}

export default Settings;
