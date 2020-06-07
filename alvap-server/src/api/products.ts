import express from 'express';
import { dbConnection } from '../database';

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/');
});

export default router;
