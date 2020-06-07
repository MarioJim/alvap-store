import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';

import api from './api';
import { dbConnection } from './database';

// From https://www.taniarascia.com/node-express-postgresql-heroku/
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Call to api methods
app.use('/api', api);

// Fallback to React frontend
app.get('*', (req, res) => {
  res.send(
    'GET to fallback\n' +
      path.join(__dirname, '..', '..', 'alvap-client', 'dist'),
  );
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server listening on https://localhost:${port}`);
});
