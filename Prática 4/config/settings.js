import dotenv from 'dotenv';

import Logger from './logger.js';

const logger = Logger('settings');

class Settings {
  constructor() {
    dotenv.config();
    this.servicePort = this.getEnviroment('PORT');
    this.mongoUrl = this.getMongoUrl();
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

  getMongoUrl() {
    const baseUrl = this.getEnviroment('MONGO_BASE_URL');
    const user = this.getEnviroment('MONGO_USER');
    const password = this.getEnviroment('MONGO_PASSWORD');

    const mongoUrl = baseUrl.replace('{0}', user).replace('{1}', password);
    return mongoUrl;
  }
}

export default Settings;
