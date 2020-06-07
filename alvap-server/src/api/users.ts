import { RequestHandler } from 'express';
import * as yup from 'yup';
import { domicilio, correo, nombre, password } from './yup_types';
import { dbConnection } from '../database';

const registrationSchema = yup.object().shape({
  correo,
  password,
  domicilio,
  nombre,
});

export const handle_register: RequestHandler = (req, res) => {
  try {
    registrationSchema.validateSync(req.body);
  } catch (error) {
    res.status(406).json(error.errors);
    return;
  }
  dbConnection.run(
    'INSERT INTO Cliente (correo, password, domicilio, nombre) VALUES (?, ?, ?, ?)',
    req.body.correo,
    req.body.password,
    req.body.domicilio,
    req.body.nombre,
    (err: any) => {
      if (err) {
        if (err.errno === 19)
          res.status(409).json(['Ya existe una cuenta con ese correo']);
        else res.sendStatus(500);
      } else res.sendStatus(200);
    },
  );
};

export const handle_login: RequestHandler = (req, res) => {
  res.redirect('/tienda');
};
