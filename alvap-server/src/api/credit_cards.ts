import express from 'express';
import * as yup from 'yup';
import * as db from '../database';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const row = await db.get(
      'SELECT * FROM Tarjeta WHERE id = (?)',
      req.params.id,
    );
    if (row === undefined) res.sendStatus(404);
    else res.json(row);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/cliente/:id', async (req, res) => {
  try {
    const rows = await db.all(
      'SELECT * FROM Tarjeta WHERE Tarjeta.id_cliente = (?)',
      req.params.id,
    );
    if (rows.length === 0) res.sendStatus(404);
    else res.json(rows);
  } catch (error) {
    res.sendStatus(500);
  }
});

const insertTarjetaSchema = yup.object().shape({
  id_cliente: yup.number().required('ID del cliente vacío'),
  titular: yup.string().required('Inserte el titular de la tarjeta'),
  num: yup
    .string()
    .matches(
      /^(-?\s*\d){16,19}$/,
      'Su tarjeta debe tener entre 16 y 19 números',
    )
    .required('Inserte un número de tarjeta'),
  fecha: yup
    .string()
    .matches(/^\d?\d[/ ]\d\d(\d\d)?$/, 'Su fecha no tiene el formato correcto')
    .required('Inserte una fecha'),
  cvv: yup
    .number()
    .positive('Inserte un cvv correcto')
    .max(9999, 'Inserte un cvv correcto')
    .required('Inserte su código secreto'),
});

router.post('/', async (req, res) => {
  try {
    insertTarjetaSchema.validateSync(req.body);
  } catch (error) {
    res.status(406).json(error.errors);
    return;
  }
  try {
    await db.run(
      'INSERT INTO Tarjeta (id_cliente, titular, num, fecha, cvv) VALUES (?, ?, ?, ?)',
      req.body.id_cliente,
      req.body.titular,
      req.body.num,
      req.body.fecha,
      req.body.cvv,
    );
    res.sendStatus(200);
  } catch (error) {
    if (error.errorno === 19)
      res.status(406).json(['No existe un cliente con ese ID']);
    else res.sendStatus(500);
  }
});

export default router;
