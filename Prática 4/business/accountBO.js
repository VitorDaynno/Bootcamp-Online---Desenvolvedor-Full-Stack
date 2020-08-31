import Logger from '../config/logger.js';
import AccountDAO from '../daos/accountDAO.js';
import Account from '../api/controllers/account.js';

const logger = Logger('AccountBO');

class AccountBO {
  constructor() {
    this.dao = new AccountDAO();
  }

  async doDeposit(body) {
    try {
      logger.info('Starting a deposit');

      const { agency, account, value } = body;
      const entity = { agency, account, value };

      this.validateTransaction(entity);

      const accountEntity = await this.dao.getAccount({ agency, account });

      if (!accountEntity || accountEntity.length == 0) {
        const error = { statusCode: 404, message: 'Account not found' };
        throw error;
      }

      const newAccount = accountEntity[0];

      const { _id: id } = newAccount;

      newAccount.balance += value;

      await this.dao.updateAccount(id, newAccount);

      return newAccount;
    } catch (error) {
      logger.error('An error occurred: %o', error);
      throw error;
    }
  }

  validateTransaction(transaction) {
    logger.info('Verifing transaction');
    const { agency, account, value } = transaction;

    this.validateNumberField(agency, 'agency');
    this.validateNumberField(account, 'account');
    this.validateNumberField(value, 'value');

    return true;
  }

  validateNumberField(param, name) {
    let error;
    if (typeof param !== 'number' || param < 0) {
      error = { statusCode: 422, message: `${name} must be a positive number` };
      throw error;
    }
  }

  async doWithdrawal(body) {
    try {
      logger.info('Starting a withdrawal');

      const { agency, account, value } = body;
      const entity = { agency, account, value };
      const transactionTax = 1;

      this.validateTransaction(entity);

      const accountEntity = await this.dao.getAccount({ agency, account });

      if (!accountEntity || accountEntity.length == 0) {
        const error = { statusCode: 404, message: 'Account not found' };
        throw error;
      }

      const newAccount = accountEntity[0];
      const { _id: id } = newAccount;

      if (newAccount.balance - (value + transactionTax) < 0) {
        const error = {
          statusCode: 409,
          message: 'Balance value is not enough',
        };
        throw error;
      }

      newAccount.balance -= value + transactionTax;

      await this.dao.updateAccount(id, newAccount);

      return newAccount;
    } catch (error) {
      logger.error('An error occurred: %o', error);
      throw error;
    }
  }

  async getBalance(agency, account) {
    try {
      logger.info('Starting a get balance');

      this.validateNumberField(agency, 'agency');
      this.validateNumberField(account, 'account');

      const accountEntity = await this.dao.getAccount({ agency, account });

      if (!accountEntity || accountEntity.length == 0) {
        const error = { statusCode: 404, message: 'Account not found' };
        throw error;
      }

      const { balance } = accountEntity[0];

      return { balance };
    } catch (error) {
      logger.error('An error occurred: %o', error);
      throw error;
    }
  }

  async deleteAccount(agency, account) {
    try {
      logger.info('Starting a get balance');

      this.validateNumberField(agency, 'agency');
      this.validateNumberField(account, 'account');

      const accountEntity = await this.dao.getAccount({ agency, account });

      if (!accountEntity || accountEntity.length == 0) {
        const error = { statusCode: 404, message: 'Account not found' };
        throw error;
      }

      const newAccount = accountEntity[0];
      const { _id: id } = newAccount;

      await this.dao.deleteAccount(id);

      const accounts = await this.dao.getAccount({ agency });

      return { activeAccounts: accounts.length };
    } catch (error) {
      logger.error('An error occurred: %o', error);
      throw error;
    }
  }

  async processTransfer(body) {
    try {
      logger.info('Starting a process transfer');

      const { originAccount, destinyAccount, value } = body;
      const entity = { originAccount, destinyAccount, value };
      const transferTax = 8;

      this.validateTransfer(entity);

      const originAccountEntity = await this.dao.getAccount({
        account: originAccount,
      });

      if (!originAccountEntity || originAccountEntity.length == 0) {
        const error = { statusCode: 404, message: 'Origin account not found' };
        throw error;
      }

      const destinyAccountEntity = await this.dao.getAccount({
        account: destinyAccount,
      });

      if (!destinyAccountEntity || destinyAccountEntity.length == 0) {
        const error = { statusCode: 404, message: 'Destiny account not found' };
        throw error;
      }

      const newOriginAccount = originAccountEntity[0].toObject();
      const newDestinyAccount = destinyAccountEntity[0].toObject();

      const { _id: originId } = newOriginAccount;
      const { _id: destinyId } = newDestinyAccount;

      const isEnough =
        newOriginAccount.agency === newDestinyAccount.agency
          ? newOriginAccount.balance - value >= 0
          : newOriginAccount.balance - (value + transferTax) >= 0;

      if (!isEnough) {
        const error = {
          statusCode: 409,
          message: 'Balance value is not enough',
        };
        throw error;
      }

      newOriginAccount.balance -=
        newOriginAccount.agency === newDestinyAccount.agency
          ? value
          : value + transferTax;
      newDestinyAccount.balance += value;

      await this.dao.updateAccount(originId, newOriginAccount);
      await this.dao.updateAccount(destinyId, newDestinyAccount);

      return { balance: newOriginAccount.balance };
    } catch (error) {
      logger.error('An error occurred: %o', error);
      throw error;
    }
  }

  validateTransfer(transfer) {
    logger.info('Verifing transfer');
    const { originAccount, destinyAccount, value } = transfer;

    this.validateNumberField(originAccount, 'originAccount');
    this.validateNumberField(destinyAccount, 'destinyAccount');
    this.validateNumberField(value, 'value');

    return true;
  }

  async averageBalance(agency) {
    try {
      logger.info('Starting a process transfer');

      this.validateNumberField(agency, 'agency');

      const accounts = await this.dao.getAccount({ agency });

      const quantityAccount = accounts.length;

      const totalBalance = accounts.reduce((accumulator, account) => {
        return (accumulator += account.balance);
      }, 0);

      const averageBalance =
        quantityAccount > 0 ? totalBalance / quantityAccount : 0;

      return { averageBalance };
    } catch (error) {
      logger.error('An error occurred: %o', error);
      throw error;
    }
  }

  async smallerBalances(limit) {
    try {
      logger.info('Starting get a smaller balances on database');

      this.validateNumberField(limit, 'limit');

      const accounts = await this.dao.getAccount({});

      const sortedAccounts = accounts.sort((a, b) => a.balance - b.balance);

      return sortedAccounts.splice(0, limit);
    } catch (error) {
      logger.error('An error occurred: %o', error);
      throw error;
    }
  }

  async biggestBalances(limit) {
    try {
      logger.info('Starting get a biggest balances on database');

      this.validateNumberField(limit, 'limit');

      const accounts = await this.dao.getAccount({});

      const sortedAccounts = accounts.sort((a, b) => b.balance - a.balance);

      return sortedAccounts.splice(0, limit);
    } catch (error) {
      logger.error('An error occurred: %o', error);
      throw error;
    }
  }

  async transferAccount() {
    try {
      logger.info('Starting transfer account');

      const agencies = await this.dao.getDistinctAgencies();

      const accountsToTransfer = [];

      for (const agency of agencies) {
        const accounts = await this.dao.getAccount({ agency });
        const sortedAccounts = accounts.sort((a, b) => b.balance - a.balance);
        const account = sortedAccounts[0].toObject();

        accountsToTransfer.push(account);
      }

      for (const account of accountsToTransfer) {
        const { _id: id } = account;
        account.agency = 99;

        await this.dao.updateAccount(id, account);
      }

      const accounts = await this.dao.getAccount({ agency: 99 });

      return accounts;
    } catch (error) {
      logger.error('An error occurred: %o', error);
      throw error;
    }
  }
}

export default AccountBO;
