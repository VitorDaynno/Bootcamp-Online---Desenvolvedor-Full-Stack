import Database from './config/database.js';
import startServer from './server.js';

const database = new Database();
startServer();
