import express from 'express';
import cors from 'cors';

import Settings from './settings.js';

const app = express();
const settings = new Settings();

app.set('port', settings.servicePort);

app.use(express.json());
app.use(cors());

export default app;
