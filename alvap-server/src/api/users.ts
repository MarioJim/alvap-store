import { RequestHandler } from 'express';
import * as yup from 'yup';
import { domicilio, correo, nombre, password, loginSchema } from './yup_types';
import * as db from '../database';

const registrationSchema = yup.object().shape({
  correo,
  password,
  domicilio,
  nombre,
});

export const handle_register: RequestHandler = async (req, res) => {
  try {
    registrationSchema.validateSync(req.body);
  } catch (error) {
    res.json({ error: error.errors });
    return;
  }
  try {
    await db.run(
      'INSERT INTO Cliente (correo, password, domicilio, nombre) VALUES (?, ?, ?, ?)',
      req.body.correo,
      req.body.password,
      req.body.domicilio,
      req.body.nombre,
    );
    res.sendStatus(200);
  } catch (error) {
    if (error.errno === 19)
      res.json({ error: ['Ya existe una cuenta con ese correo'] });
    else {
      console.error(error);
      res.sendStatus(500);
    }
  }
};

export const handle_login: RequestHandler = async (req, res) => {
  try {
    loginSchema.validateSync(req.body);
  } catch (error) {
    res.json({ error: error.errors });
    return;
  }
  try {
    const user = await db.get(
      'SELECT * FROM Cliente WHERE correo = (?)',
      req.body.correo,
    );
    if (user === undefined) {
      res.json({ error: ['Usuario no encontrado'] });
    } else if (user.password !== req.body.password) {
      res.json({ error: ['Contraseña incorrecta'] });
    } else {
      res.json({ userID: user.id });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const handle_user_query: RequestHandler = async (req, res) => {
  try {
    const user = await db.get(
      'SELECT * FROM Cliente WHERE id = (?)',
      req.params.id,
    );
    if (user === undefined) {
      res.json({ error: ['Usuario no encontrado'] });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
