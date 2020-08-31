import Logger from '../config/logger.js';
import model from '../models/account.js';

const logger = Logger('AccountDAO');

class AccountDAO {
  constructor() {
    this.dao = model;
  }

  async getAccount(fields) {
    logger.info('Starting get account');
    try {
      const { agency, account } = fields;
      const filter = {};

      agency ? (filter['agency'] = agency) : null;
      account ? (filter['account'] = account) : null;

      const r = await this.dao.find(filter).exec();
      return r;
    } catch (error) {
      logger.error('An error occurred: ', error);
      error = {
        message: 'An error occurred when try get account',
        error,
      };
      throw error;
    }
  }

  async updateAccount(id, account) {
    logger.info('Starting update account');
    try {
      const filter = { _id: id };
      const r = await this.dao.updateOne(filter, account);
      return r;
    } catch (error) {
      logger.error('An error occurred: ', error);
      error = {
        message: 'An error occurred when try updated account',
        error,
      };
      throw error;
    }
  }

  async deleteAccount(id) {
    logger.info('Starting delete account');
    try {
      const filter = { _id: id };
      const r = await this.dao.deleteOne(filter);
      return r;
    } catch (error) {
      logger.error('An error occurred: ', error);
      error = {
        message: 'An error occurred when try delete account',
        error,
      };
      throw error;
    }
  }

  async getDistinctAgencies() {
    logger.info('Starting delete account');
    try {
      const r = await this.dao.distinct('agency');
      return r;
    } catch (error) {
      logger.error('An error occurred: ', error);
      error = {
        message: 'An error occurred when get distincts agencies',
        error,
      };
      throw error;
    }
  }
}

export default AccountDAO;
