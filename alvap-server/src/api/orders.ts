import express from 'express';
import * as yup from 'yup';
import * as db from '../database';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const row = await db.get(
      'SELECT * FROM Orden WHERE id = (?)',
      req.params.id,
    );
    if (row === undefined) res.sendStatus(404);
    else res.json(row);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/cliente/:id', async (req, res) => {
  try {
    const rows = await db.all(
      'SELECT * FROM Orden INNER JOIN (SELECT Carrito.id AS select_id FROM Carrito WHERE Carrito.id_cliente = ?) ON Orden.id = select_id',
      req.params.id,
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

const insertOrderSchema = yup.object().shape({
  id_carrito: yup.number().required('ID del carrito vacía'),
  propina: yup
    .number()
    .required('Propina vacía')
    .min(0, 'Inserta una propina no negativa'),
});

router.post('/', async (req, res) => {
  try {
    insertOrderSchema.validateSync(req.body);
  } catch (error) {
    res.status(406).json(error.errors);
    return;
  }
  try {
    await db.run(
      'INSERT INTO Orden (id_carrito, fecha, propina, estado) VALUES (?, CURRENT_TIMESTAMP, ?, "En camino")',
      req.body.id_carrito,
      req.body.propina,
    );
    res.sendStatus(200);
  } catch (error) {
    if (error.errno === 19)
      res.status(406).json(['No existe un carrito con ese ID']);
    else {
      console.error(error);
      res.sendStatus(500);
    }
  }
});

export default router;
