import { RequestHandler } from 'express';
import * as yup from 'yup';
import { dbConnection } from '../database';

const registrationSchema = yup.object().shape({
  correo: yup
    .string()
    .email('Inserta un correo electrónico')
    .required('Inserta un correo electrónico'),
  password: yup
    .string()
    .length(8, 'La contraseña debe de tener por lo menos 8 caracteres')
    .required('Inserta una contraseña'),
  domicilio: yup.string().required('Inserta un domicilio'),
  nombre: yup.string().required('Inserta un nombre'),
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
          res.status(406).json(['Ya existe una cuenta con ese correo']);
        else res.status(500).json(err);
      } else res.json({ message: 'success' });
    },
  );
};

export const handle_login: RequestHandler = (req, res) => {
  res.redirect('/tienda');
};
