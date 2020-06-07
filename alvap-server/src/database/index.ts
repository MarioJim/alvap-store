import sqlite3 from 'sqlite3';
import path from 'path';

sqlite3.verbose();

const DB_PATH = path.join(__dirname, '..', '..', 'alvap.db');

export const dbConnection = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to database');
  }
});
