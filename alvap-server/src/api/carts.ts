import express from 'express';
import * as yup from 'yup';
import * as db from '../database';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const rows = await db.all(
      'SELECT * FROM Rel_Carrito_Producto, Producto WHERE id_producto = id AND id_carrito = ?',
      req.params.id,
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/:id/promos', async (req, res) => {
  try {
    const rows = await db.all(
      'SELECT * FROM Rel_Carrito_Promocion, Promocion WHERE id_promocion = id AND id_carrito = ?',
      req.params.id,
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

const insertCartSchema = yup.object().shape({
  id_cliente: yup.number().required('ID del cliente vacía'),
});

router.post('/', async (req, res) => {
  try {
    insertCartSchema.validateSync(req.body);
  } catch (error) {
    res.status(406).json(error.errors);
    return;
  }
  try {
    const { lastID } = await db.run(
      'INSERT INTO Carrito (id_cliente) VALUES (?)',
      req.body.id_cliente,
    );
    res.json({ id: lastID });
  } catch (error) {
    if (error.errno === 19)
      res.status(406).json(['No existe un cliente con ese ID']);
    else {
      console.error(error);
      res.sendStatus(500);
    }
  }
});

const insertProductToCartSchema = yup.object().shape({
  id_carrito: yup.number().required('ID del carrito vacía'),
  id_producto: yup.number().required('ID del producto vacía'),
});

router.post('/addProduct', async (req, res) => {
  try {
    insertProductToCartSchema.validateSync(req.body);
  } catch (error) {
    res.status(406).json(error.errors);
    return;
  }
  try {
    await db.run(
      'INSERT INTO Rel_Carrito_Producto (id_producto, id_carrito) VALUES (?, ?)',
      req.body.id_producto,
      req.body.id_carrito,
    );
    res.sendStatus(200);
  } catch (error) {
    if (error.errno === 19)
      res.status(406).json(['No existe un carrito o producto con ese ID']);
    else {
      console.error(error);
      res.sendStatus(500);
    }
  }
});

export default router;
