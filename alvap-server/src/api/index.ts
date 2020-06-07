import express from 'express';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { dbConnection } from '../database';
import { User } from '../database/types';
import products_router from './products';
import * as users from './users';
import * as delivery from './delivery_men';

// From https://github.com/passport/express-4.x-local-example
passport.use(
  new Strategy((username, password, done) => {
    dbConnection.get(
      'SELECT * FROM Cliente WHERE correo = (?)',
      username,
      (err, user: User) => {
        console.log(err, user, password);
        if (err) done(err);
        else if (user === undefined)
          done(null, false, { message: 'Usuario no encontrado' });
        else if (password !== user.password)
          done(null, false, { message: 'Contraseña incorrecta' });
        else done(null, user);
      },
    );
  }),
);

passport.serializeUser<User, number>((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  dbConnection.get('SELECT * FROM Cliente WHERE id = (?)', id, (err, row) => {
    if (err) done(err);
    else if (row === undefined) done(null, false);
    else done(null, row);
  });
});

// From https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/
const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res) => {
  dbConnection.get('SELECT sqlite_version()', (err, row) => {
    if (err) res.status(500).json(err);
    else res.json(row);
  });
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

router.use('/products', products_router);

export default router;
