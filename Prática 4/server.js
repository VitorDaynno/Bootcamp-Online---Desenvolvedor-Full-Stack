import app from './config/express.js';
import accountRoutes from './api/routes/account.js';

accountRoutes(app);

const startServer = () => {
  app.listen(app.get('port'), () => {
    console.log('Express is running on port now ' + app.get('port'));
  });
};

export default startServer;
