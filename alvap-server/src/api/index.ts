import express from 'express';
import * as db from '../database';
import cards_router from './credit_cards';
import carts_router from './carts';
import orders_router from './orders';
import products_router from './products';
import * as users from './users';
import * as delivery from './delivery_men';

// From https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const row = await db.get('SELECT sqlite_version()');
    res.json(row);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/login', users.handle_login);
router.post('/register', users.handle_register);
router.get('/user/:id', users.handle_user_query);

router.post('/loginDelivery', delivery.handle_login);
router.post('/registerDelivery', delivery.handle_register);
router.get('/delivery/:id', users.handle_user_query);

router.use('/cards', cards_router);
router.use('/carts', carts_router);
router.use('/orders', orders_router);
router.use('/products', products_router);

export default router;
