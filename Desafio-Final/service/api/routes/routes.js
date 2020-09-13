import express from 'express';

import TransactionService from '../services/transactionService.js';

const app = express.Router();
const transactionService = new TransactionService();

app
  .route('/v1/transactions')
  .post(transactionService.create)
  .get(transactionService.get);

app
  .route('/v1/transactions/:id')
  .put(transactionService.update)
  .delete(transactionService.delete);

export default app;
