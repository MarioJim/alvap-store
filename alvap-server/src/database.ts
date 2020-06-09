import sqlite3 from 'sqlite3';
import path from 'path';

sqlite3.verbose();

const DB_PATH = path.join(__dirname, '..', 'alvap.db');

const dbConnection = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to database');
  }
});

dbConnection.get('PRAGMA foreign_keys = ON');

export const get = <T = any>(sql: string, ...params: any[]) =>
  new Promise<T>((resolve, reject) => {
    dbConnection.get(sql, ...params, (err: any, row: any) => {
      if (err) reject(err);
      else resolve(row as T);
    });
  });

export const all = <T = any>(sql: string, ...params: any[]) =>
  new Promise<T[]>((resolve, reject) => {
    dbConnection.all(sql, ...params, (err: any, rows: any) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });

interface RunResult {
  lastID: number;
}

export const run = (sql: string, ...params: any[]) =>
  new Promise<RunResult>((resolve, reject) => {
    dbConnection.run(sql, ...params, function (this: RunResult, err: any) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID });
    });
  });
