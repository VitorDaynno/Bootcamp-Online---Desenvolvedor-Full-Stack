import Accounts from '../controllers/account.js';

const routes = (app) => {
  const controller = new Accounts();

  app.route('/v1/deposits').post(controller.doDeposit);

  app.route('/v1/withdrawals').post(controller.doWithdrawal);

  app
    .route('/v1/balances')
    .get(controller.getBalance)
    .delete(controller.deleteAccount);

  app.route('/v1/transfers').post(controller.processTransfer);

  app.route('/v1/average-balances').get(controller.averageBalance);

  app.route('/v1/smaller-balances').get(controller.smallerBalances);

  app.route('/v1/biggest-balances').get(controller.biggestBalances);

  app.route('/v1/transfer-accounts').post(controller.transferAccounts);
};

export default routes;
