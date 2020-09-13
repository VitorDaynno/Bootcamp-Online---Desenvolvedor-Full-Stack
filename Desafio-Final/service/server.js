import express from 'express';

import app from './config/express.js';
import transactionRoutes from './api/routes/routes.js';

const startServer = () => {
  app.use('/api/', transactionRoutes);
  app.use(express.static('../client/build'));
  app.listen(app.get('port'), () => {
    console.log('Express is running on port now ' + app.get('port'));
  });
};

export default startServer;
