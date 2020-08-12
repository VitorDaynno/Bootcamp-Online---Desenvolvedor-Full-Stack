import http from 'http';

import app from './config/express.js';
import gradesRoutes from './api/routes/grades.js';

gradesRoutes(app);

var server = http.createServer(app).listen(app.get('port'), function () {
  console.log('Express is running on port now ' + app.get('port'));
});

export default server;
