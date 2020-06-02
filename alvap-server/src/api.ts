import express from 'express';
import { dbConnection } from './database';

// From https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/

const router = express.Router();

router.get('/', (req, res) => {
  const sql = 'SELECT sqlite_version();'
  dbConnection.get(sql, (err, row) => {
    if (err) {
      res
        .status(400)
        .json({ error: err.message, });
      return;
    }
    res.json({
      message: 'success',
      data: row,
    });
  });
});

// TODO: Append api methods

export default router;
