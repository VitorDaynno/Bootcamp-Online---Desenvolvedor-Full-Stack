import Logger from '../../config/logger.js';
import transactionModel from '../../models/transactionModel.js';
import {
  validateStringField,
  validateNumberField,
} from '../../helpers/validate.js';

const logger = Logger('TransactionService');

class TransactionService {
  get = async (req, res) => {
    logger.info('Getting transactions');
    try {
      const { period } = req.query;

      if (!period || period === '') {
        const error = {
          code: 400,
          message: 'The param period is required',
        };
        throw error;
      }

      const filter = {
        yearMonth: period,
      };

      const transactions = await transactionModel.find(filter);

      res.status(200).json(transactions);
    } catch (error) {
      const { code, message } = error;
      const responseCode = code || 500;
      const responseMessage = message || 'An error occurred';
      res.status(responseCode).json({ message: responseMessage });
    }
  };
  create = async (req, res) => {
    logger.info('Creating transaction');
    try {
      const entity = req.body;

      this.validateTransaction(entity);

      const transaction = this.processTransaction(entity);

      const createdTransaction = await transactionModel.create(transaction);

      res.status(201).json(createdTransaction);
    } catch (error) {
      const { code, message } = error;
      const responseCode = code || 500;
      const responseMessage = message || 'An error occurred';
      res.status(responseCode).json({ message: responseMessage });
    }
  };

  update = async (req, res) => {
    logger.info('Updating transaction');
    try {
      const { id } = req.params;
      const entity = req.body;

      this.validateTransaction(entity);

      const filter = { _id: id };
      const transaction = this.processTransaction(entity);

      const updatedTransaction = await transactionModel.findOneAndUpdate(
        filter,
        transaction,
        { new: true, useFindAndModify: false }
      );

      res.status(200).json(updatedTransaction || {});
    } catch (error) {
      const { code, message } = error;
      const responseCode = code || 500;
      const responseMessage = message || 'An error occurred';
      res.status(responseCode).json({ message: responseMessage });
    }
  };

  delete = async (req, res) => {
    logger.info('Deleting transaction');
    try {
      const { id } = req.params;

      const filter = { _id: id };

      await transactionModel.findByIdAndDelete(filter);

      res.status(204).json({});
    } catch (error) {
      const { code, message } = error;
      const responseCode = code || 500;
      const responseMessage = message || 'An error occurred';
      res.status(responseCode).json({ message: responseMessage });
    }
  };

  validateTransaction = (transaction) => {
    const {
      description,
      value,
      category,
      year,
      month,
      day,
      type,
    } = transaction;

    validateStringField(description, 'description');
    validateNumberField(value, 'value');
    validateStringField(category, 'category');
    validateNumberField(year, 'year');
    validateNumberField(month, 'month');
    validateNumberField(day, 'day');
    validateStringField(type, 'type');
  };

  processTransaction = (entity) => {
    const { description, value, category, year, month, day, type } = entity;

    const transaction = {
      description,
      value,
      category,
      year,
      month,
      day,
      type,
      yearMonth: `${year}-${month > 9 ? month : '0' + month}`,
      yearMonthDay: `${year}-${month > 9 ? month : '0' + month}-${
        day > 9 ? day : '0' + day
      }`,
    };

    return transaction;
  };

  getConsolidatedInfo = async (req, res) => {
    logger.info('Getting consolidated info');
    try {
      const { period } = req.query;

      if (!period || period === '') {
        const error = {
          code: 400,
          message: 'The param period is required',
        };
        throw error;
      }

      const filter = {
        yearMonth: period,
      };

      const transactions = await transactionModel.find(filter);

      const consolidatedInfo = this.processInfo(transactions);

      res.status(200).json(consolidatedInfo);
    } catch (error) {
      const { code, message } = error;
      const responseCode = code || 500;
      const responseMessage = message || 'An error occurred';
      res.status(responseCode).json({ message: responseMessage });
    }
  };

  processInfo = (transactions) => {
    const transactionsCount = transactions.length;
    let revenueTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      const { value, type } = transaction;
      type == '+'
        ? (revenueTotal = revenueTotal + value)
        : (expenseTotal += value);
    });

    const balanceTotal = revenueTotal - expenseTotal;

    const consolidatedInfo = {
      transactionsCount,
      revenueTotal,
      expenseTotal,
      balanceTotal,
    };

    return consolidatedInfo;
  };
}

export default TransactionService;
