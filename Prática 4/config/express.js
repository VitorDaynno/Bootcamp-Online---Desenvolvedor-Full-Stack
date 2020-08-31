import express from 'express';
import bodyParser from 'body-parser';

import Settings from './settings.js';

const app = express();
const settings = new Settings();

app.set('port', settings.servicePort);

app.use(bodyParser.json());
app.use(function (_req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Request-With');
  next();
});

export default app;
