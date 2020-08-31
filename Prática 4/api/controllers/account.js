import Logger from '../../config/logger.js';
import AccountBO from '../../business/accountBO.js';

const logger = Logger('Account');

class Account {
  async doDeposit(req, res) {
    try {
      logger.info('Started doDeposit');
      const body = req.body ? req.body : {};
      const business = new AccountBO();
      const response = await business.doDeposit(body);
      res.status(201).json(response);
    } catch (error) {
      logger.error('An error occurred when do a deposit: %o', error);
      const statusCode = error.statusCode ? error.statusCode : 500;
      res.status(statusCode).json({ message: error.message });
    }
  }

  async doWithdrawal(req, res) {
    try {
      logger.info('Started doWithdrawal');
      const body = req.body ? req.body : {};
      const business = new AccountBO();
      const response = await business.doWithdrawal(body);
      res.status(201).json(response);
    } catch (error) {
      logger.error('An error occurred when do a withdrawal: %o', error);
      const statusCode = error.statusCode ? error.statusCode : 500;
      res.status(statusCode).json({ message: error.message });
    }
  }

  async getBalance(req, res) {
    try {
      logger.info('Started getBalance');
      const { agency, account } = req.query;
      const business = new AccountBO();
      const response = await business.getBalance(+agency, +account);
      res.status(200).json(response);
    } catch (error) {
      logger.error('An error occurred when get balance: %o', error);
      const statusCode = error.statusCode ? error.statusCode : 500;
      res.status(statusCode).json({ message: error.message });
    }
  }

  async deleteAccount(req, res) {
    try {
      logger.info('Started deleteAccount');
      const { agency, account } = req.query;
      const business = new AccountBO();
      const response = await business.deleteAccount(+agency, +account);
      res.status(200).json(response);
    } catch (error) {
      logger.error('An error occurred when try delete account: %o', error);
      const statusCode = error.statusCode ? error.statusCode : 500;
      res.status(statusCode).json({ message: error.message });
    }
  }

  async processTransfer(req, res) {
    try {
      logger.info('Started processTransfer');
      const body = req.body ? req.body : {};
      const business = new AccountBO();
      const response = await business.processTransfer(body);
      res.status(201).json(response);
    } catch (error) {
      logger.error('An error occurred when try process transfer: %o', error);
      const statusCode = error.statusCode ? error.statusCode : 500;
      res.status(statusCode).json({ message: error.message });
    }
  }

  async averageBalance(req, res) {
    try {
      logger.info('Started average balance of agency');
      const { agency } = req.query;
      const business = new AccountBO();
      const response = await business.averageBalance(+agency);
      res.status(200).json(response);
    } catch (error) {
      logger.error('An error occurred when get average balance: %o', error);
      const statusCode = error.statusCode ? error.statusCode : 500;
      res.status(statusCode).json({ message: error.message });
    }
  }

  async smallerBalances(req, res) {
    try {
      logger.info('Started get the smaller balances');
      const { limit } = req.query;
      const business = new AccountBO();
      const response = await business.smallerBalances(+limit);
      res.status(200).json(response);
    } catch (error) {
      logger.error(
        'An error occurred when get the smaller balances: %o',
        error
      );
      const statusCode = error.statusCode ? error.statusCode : 500;
      res.status(statusCode).json({ message: error.message });
    }
  }

  async biggestBalances(req, res) {
    try {
      logger.info('Started get the biggest balances');
      const { limit } = req.query;
      const business = new AccountBO();
      const response = await business.biggestBalances(+limit);
      res.status(200).json(response);
    } catch (error) {
      logger.error(
        'An error occurred when get the biggest balances: %o',
        error
      );
      const statusCode = error.statusCode ? error.statusCode : 500;
      res.status(statusCode).json({ message: error.message });
    }
  }

  async transferAccounts(_req, res) {
    try {
      logger.info('Started transfer account');
      const business = new AccountBO();
      const response = await business.transferAccount();
      res.status(200).json(response);
    } catch (error) {
      logger.error('An error occurred when transfer the accounts: %o', error);
      const statusCode = error.statusCode ? error.statusCode : 500;
      res.status(statusCode).json({ message: error.message });
    }
  }
}

export default Account;
