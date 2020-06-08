import { RequestHandler } from 'express';
import * as yup from 'yup';
import { domicilio, correo, nombre, password } from './yup_types';
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
    res.status(200).json({ error: error.errors });
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
      res.status(409).json(['Ya existe una cuenta con ese correo']);
    else {
      console.error(error);
      res.sendStatus(500);
    }
  }
};

export const handle_login: RequestHandler = (req, res) => {
  res.redirect('/tienda');
};
