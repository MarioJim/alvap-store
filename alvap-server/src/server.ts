import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import api from './api';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Call to api methods
app.use('/api', api);

// Download database
app.get('/alvap.db', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'alvap.db'));
});

// Fallback to React frontend
app.get('*', (req, res) => {
  res.send(
    'GET to fallback\n' +
      path.join(__dirname, '..', '..', 'alvap-client', 'dist'),
  );
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
