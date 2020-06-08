import express from 'express';
import passport from 'passport';
import { Strategy } from 'passport-local';
import * as db from '../database';
import { User } from '../database/types';
import cards_router from './credit_cards';
import orders_router from './orders';
import products_router from './products';
import * as users from './users';
import * as delivery from './delivery_men';

// From https://github.com/passport/express-4.x-local-example
passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await db.get<User>(
        'SELECT * FROM Cliente WHERE correo = (?)',
        username,
      );
      if (user === undefined)
        done(null, false, { message: 'Usuario no encontrado' });
      else if (password !== user.password)
        done(null, false, { message: 'Contraseña incorrecta' });
      else done(null, user);
    } catch (error) {
      done(error);
    }
  }),
);

passport.serializeUser<User, number>((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const row = await db.get('SELECT * FROM Cliente WHERE id = (?)', id);
    if (row === undefined) done(null, false);
    else done(null, row);
  } catch (error) {
    done(error);
  }
});

// From https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/
const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

router.get('/', async (req, res) => {
  try {
    const row = await db.get('SELECT sqlite_version()');
    res.json(row);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/register', users.handle_register);

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
  }),
  users.handle_login,
);

router.post('/registerDelivery', delivery.handle_register);

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
  }),
  delivery.handle_login,
);

router.use('/cards', cards_router);
router.use('/orders', orders_router);
router.use('/products', products_router);

export default router;
