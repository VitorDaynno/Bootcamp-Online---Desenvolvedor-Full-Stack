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

app.route('/v1/consolidated-infos').get(transactionService.getConsolidatedInfo);

export default app;
