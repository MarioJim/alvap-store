import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('GET to /api/')
});

// TODO: Append api methods

export default router;
